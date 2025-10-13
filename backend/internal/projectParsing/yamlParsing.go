package projectparsing

import (
	"fmt"
	"os"
	"path/filepath"

	"gopkg.in/yaml.v3"
)

type Pipeline struct {
	Name string `yaml:"name" json:"name"`
	Job  []Jobs `yaml:"jobs" json:"jobs"`
}

type Jobs struct {
	Name      string            `yaml:"name" json:"name"`
	Run       string            `yaml:"run" json:"run"`
	Status    string            `yaml:"status" json:"status"`
	Container string            `yaml:"container" json:"container"`
	Env       map[string]string `yaml:"env" json:"env"`
}

func ParseYamlToRun(filePath string, directoryPath string) (*Pipeline, error) {
	if filePath == "" || directoryPath == "" {
		return nil, fmt.Errorf("path can't be empty")
	}

	path := filepath.Join(directoryPath, filePath)
	data, err := os.ReadFile(path)
	if err != nil {
		return nil, err
	}

	var pipeline Pipeline
	err = yaml.Unmarshal(data, &pipeline)
	if err != nil {
		return nil, err
	}

	if pipeline.Name == "" || len(pipeline.Job) == 0 {
		return nil, fmt.Errorf("pipeline is not valid either name is empty or jobs are not declared")
	}

	return &pipeline, nil
}
