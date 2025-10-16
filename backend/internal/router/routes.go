package router

import (
	"backend/internal/handler"

	"github.com/gin-gonic/gin"
)

func RegisterRoutes(r *gin.Engine) {
	v1 := r.Group("/api/v1")
	{
		v1.POST("/project", handler.CreateProject)
		v1.GET("/projects", handler.GetProjects)
	}
}
