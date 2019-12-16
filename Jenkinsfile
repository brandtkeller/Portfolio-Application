pipeline {
    agent none
    options {
        skipStagesAfterUnstable()
    }
    stages {
        stage('clean') {
            agent any
            steps {
                sh 'cd /root/output && rm -rf *'
            }
        }
        stage('build') {
            agent {
                docker { 
                    image 'node:lts'
                    args '-v /home/server/output:/root/output'
                    }
            }
            steps {
                sh 'npm --version'
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
                sh 'aws2 s3 ls'
                sh 'aws2 s3 sync /root/output s3://brandtkeller.net'
            }
        }
    }
}