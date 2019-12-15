pipeline {
    agent { docker { image 'node:lts' } }
    stages {
        stage('build') {
            steps {
                sh 'npm --version'
                sh 'npm install -g ember-cli'
                sh 'ember -v'
                sh 'ls'
            }
        }
    }
}