package handler

import (
	projectparsing "backend/internal/projectParsing"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type Project struct {
	ID        string `json:"id"`
	Name      string `json:"name"`
	Directory string `json:"directory"`
	FileName  string `json:"filename"`
}

var ProjectMap = map[string]Project{}

var count int = 0

func CreateProject(c *gin.Context) {
	var project Project
	if err := c.BindJSON(&project); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	index := strconv.Itoa(count)

	ProjectMap[index] = project

	pipeline, err := projectparsing.ParseYamlToRun(project.FileName, project.Directory)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	fmt.Println("pipeline is here!!!", pipeline.Job)

	projectparsing.RunJobs(pipeline, project.Directory)

	count++

	c.JSON(http.StatusOK, gin.H{"data": project})
}

func GetProjects(c *gin.Context) {
	var projects []Project

	for _, project := range ProjectMap {
		projects = append(projects, project)
	}

	c.JSON(http.StatusOK, gin.H{"data": projects})
}
