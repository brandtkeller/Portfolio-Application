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
            agent {
                docker { 
                    image 'ubuntu:18.04' 
                    args '-v $HOME/.aws:/root/.aws'    
                }
            }
            steps {
                sh 'apt-get update -qq && apt-get install -qqy apt-transport-https ca-certificates curl unzip gnupg2 software-properties-common'
                sh 'curl "https://d1vvhvl2y92vvt.cloudfront.net/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"'
                sh 'unzip awscliv2.zip'
                sh './aws/install'
                sh 'aws2 s3 ls'
            }
        }
    }
}