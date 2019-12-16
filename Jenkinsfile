pipeline {
    agent none
    options {
        skipStagesAfterUnstable()
    }
    stages {
        stage('build') {
            agent {
                docker { image 'node:lts' }
            }
            steps {
                sh 'npm --version'
                sh 'npm install -g ember-cli'
                sh 'ember -v'
                sh 'ls'
            }
        }
        stage('deploy') {
            agent any
            }
            steps {
                sh 'ls /root/.aws'
                sh 'aws2 s3 ls'
            }
        }
    }
}