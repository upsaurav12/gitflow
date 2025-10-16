package handler

import (
	projectparsing "backend/internal/projectParsing"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

type Project struct {
	ID        string `json:"id"`
	Name      string `json:"name"`
	Directory string `json:"directory"`
	FileName  string `json:"filename"`
}

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool { return true }, // allow all origins (for dev)
}

var ProjectMap = map[string]Project{}

var count int = 0

func CreateProject(c *gin.Context) {
	var project Project
	if err := c.BindJSON(&project); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	index := project.ID

	ProjectMap[index] = project

	pipeline, err := projectparsing.ParseYamlToRun(project.FileName, project.Directory)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	fmt.Println("pipeline is here!!!", pipeline.Job)

	count++

	c.JSON(http.StatusOK, gin.H{"data": project})
}

func GetProject(c *gin.Context) {
	id := c.Param("id")
	project, ok := ProjectMap[id]
	if !ok {
		c.JSON(http.StatusNotFound, gin.H{"error": "project not found"})
		return
	}

	conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		fmt.Println("WebSocket upgrade failed:", err)
		return
	}
	defer conn.Close()

	send := func(format string, args ...interface{}) {
		msg := fmt.Sprintf(format, args...)
		fmt.Println(msg)
		conn.WriteMessage(websocket.TextMessage, []byte(msg))
	}

	send("📦 Initializing project: %s", project.FileName)

	pipeline, err := projectparsing.ParseYamlToRun(project.FileName, project.Directory)
	if err != nil {
		send("❌ Error parsing YAML: %v", err)
		return
	}

	send("🧩 Pipeline loaded successfully. Running jobs...\n")
	projectparsing.RunJobs(pipeline, project.Directory, conn)
}

func GetProjects(c *gin.Context) {
	var projects []Project

	for _, project := range ProjectMap {
		projects = append(projects, project)
	}

	c.JSON(http.StatusOK, gin.H{"data": projects})
}
