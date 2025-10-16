package projectparsing

import (
	"fmt"
	"io"
	"os/exec"
	"strings"
)

func RunJobs(pipelines *Pipeline, projectDirectory string) {
	jobs := pipelines.Job

	for _, job := range jobs {
		job.Status = "started"

		jobSplit := strings.Split(job.Run, " ")
		cmd := exec.Command(jobSplit[0], jobSplit[1:]...)
		cmd.Dir = projectDirectory

		stdoutPipe, _ := cmd.StdoutPipe()
		stderrPipe, _ := cmd.StderrPipe()
		if err := cmd.Start(); err != nil {
			fmt.Println("error while starting in cmd: ", err)
			return
		}

		output, _ := io.ReadAll(stdoutPipe)
		outputErr, _ := io.ReadAll(stderrPipe)

		if len(output) > 0 {
			fmt.Println("output: ", string(output))
		}

		if len(outputErr) > 0 {
			fmt.Println("output: ", string(outputErr))
		}

		if err := cmd.Wait(); err != nil {
			fmt.Println("err while waiting : ", err)
			return
		}

		fmt.Println(job.Name, "has been run successfully")
	}
}
