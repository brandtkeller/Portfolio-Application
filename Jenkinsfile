pipeline {
    agent { docker { image 'node:lts' } }
    stages {
        stage('build') {
            steps {
                sh 'npm --version'
            }
        }
    }
}