package projectparsing

import (
	"bufio"
	"fmt"
	"io"
	"os/exec"

	"github.com/gorilla/websocket"
)

func RunJobs(pipelines *Pipeline, projectDirectory string, conn *websocket.Conn) {
	jobs := pipelines.Job

	send := func(format string, args ...interface{}) {
		msg := fmt.Sprintf(format, args...)
		fmt.Println(msg)
		conn.WriteMessage(websocket.TextMessage, []byte(msg))
	}

	for i, job := range jobs {
		header := fmt.Sprintf("\n\n🚀 Starting Job %d/%d: **%s**\n----------------------------------------", i+1, len(jobs), job.Name)
		send(header)
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
			send("❌ Failed to start job %s: %v", job.Name, err)
			return
		}

		// Live streaming logs
		stream := func(prefix string, r io.Reader) {
			scanner := bufio.NewScanner(r)
			for scanner.Scan() {
				line := scanner.Text()
				send("[%s] %s", prefix, line)
			}
		}

		go stream("stdout", stdout)
		go stream("stderr", stderr)

		if err := cmd.Wait(); err != nil {
			send("❌ Job %s failed: %v", job.Name, err)
			return
		}

		job.Status = "completed"
		send("✅ Job %s completed successfully.\n----------------------------------------", job.Name)
	}

	send("\n🎉 All jobs completed successfully! 🚀\n")
}
