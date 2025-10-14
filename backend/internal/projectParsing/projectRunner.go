package projectparsing

import (
	"bufio"
	"fmt"
	"os/exec"
)

func RunJobs(pipelines *Pipeline, projectDirectory string) {
	jobs := pipelines.Job

	for _, job := range jobs {
		job.Status = "started"

		args := []string{
			"run", "--rm",
			"-v", fmt.Sprintf("%s:/app", projectDirectory),
			"-w", "/app",
			"golang:1.24",
			"sh", "-c", job.Run,
		}

		cmd := exec.Command("docker", args...)
		cmd.Dir = projectDirectory

		stdout, _ := cmd.StdoutPipe()
		stderr, _ := cmd.StderrPipe()
		if err := cmd.Start(); err != nil {
			fmt.Println("error while starting in cmd: ", err)
			return
		}

		go func() {
			scanner := bufio.NewScanner(stdout)
			for scanner.Scan() {
				fmt.Println(scanner.Text())
			}
		}()

		go func() {
			scanner := bufio.NewScanner(stderr)
			for scanner.Scan() {
				fmt.Println(scanner.Text())
			}
		}()

		if err := cmd.Wait(); err != nil {
			fmt.Println("err while waiting: ", err)
			return
		}

		fmt.Println(job.Name, "has been run successfully")
	}
}
