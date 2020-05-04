pipeline {
   agent none
 
   environment {
         HOME_REPO = 'gitlab.nostromo.io:8443/devops/docker/nos-coredns.git'
         GITHUB_REPO = 'git.web.boeing.com/nostromo/docker/nos-coredns.git'
         REGISTRY = ''
         IMAGE = ''
         PROJECT = ''
    }

   stages {
      // On push to development branches, build and scan test image
      stage('Development build & push') {
          agent {label 'dk-nos-02.nostromo.io'}
          when { not { branch 'master' } }
          steps {
            checkout scm
            sh 'sudo podman build --format=docker -t ${REGISTRY}/${IMAGE}-${BRANCH_NAME}:${BUILD_NUMBER} .'
            withDockerRegistry(credentialsId: 'jenkins_svc', url: 'https://$REGISTRY') {
                sh 'sudo podman push ${REGISTRY}/${IMAGE}-${BRANCH_NAME}:${BUILD_NUMBER}'
            }
          }
      }
      // On push to master, buid prod image and scan

      stage('Master build & push') {
          agent {label 'dk-nos-02.nostromo.io'}
          when { branch 'master' }
          steps {
            checkout scm
            sh 'sudo podman build --format=docker -t ${REGISTRY}/${IMAGE}:latest -t ${REGISTRY}/${IMAGE}:${BUILD_NUMBER} .'
            withDockerRegistry(credentialsId: 'jenkins_svc', url: 'https://$REGISTRY') {
                sh 'sudo podman push ${REGISTRY}/${IMAGE}:latest'
                sh 'sudo podman push ${REGISTRY}/${IMAGE}:${BUILD_NUMBER}'
            }
          }
      }

      stage('Mirror to Boeing Gitlab') {
         agent any
         options { skipDefaultCheckout true }
         when { branch 'master' }
         steps {
            catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
               withCredentials([usernamePassword(credentialsId: 'jenkins_svc', passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
                            sh 'rm -rf *'
                            sh 'git clone --mirror https://$NOS_REPO'
               }
               withCredentials([usernamePassword(credentialsId: 'brandtkellergitlab', passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
                           dir("${PROJECT}.git"){
                                 sh 'git remote add --mirror=fetch boeing https://$GIT_USERNAME:$GIT_PASSWORD@$BOEING_REPO'
                                 sh 'git push boeing --all'
                           }
               }
            }
         }
      }
   }