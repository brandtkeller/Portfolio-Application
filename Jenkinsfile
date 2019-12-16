pipeline {
    agent none
    options {
        skipStagesAfterUnstable()
    }
    stages {
        stage('build') {
            agent {
                docker { 
                    image 'node:lts'
                    args '-v /home/server/output:/root/output'
                    }
            }
            steps {
                sh 'npm --version'
                sh 'whoami'
                sh 'npm install -g ember-cli'
                sh 'npm install'
                sh 'ember -v'
                sh 'ls'
                sh 'ember build -prod -o=/root/output'
            }
        }
        stage('deploy') {
            agent any
            steps {
                sh 'ls /root/.aws'
                sh 'aws2 s3 ls'
            }
        }
    }
}