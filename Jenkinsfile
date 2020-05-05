pipeline {
   agent none
 
   environment {
         HOME_REPO = 'gitlab.nostromo.io:8443/devops/docker/nos-coredns.git'
         GITHUB_REPO = 'git.web.github.com/nostromo/docker/nos-coredns.git'
         REGISTRY = ''
         IMAGE = ''
         PROJECT = ''
    }

   stages {
      // On push to development branches, build and scan test image
      stage('Development build & push') {
          agent { node { label 'docker' } } 
          when { not { branch 'master' } }
          steps {
            sh 'echo Building....'
          }
      }
      // On push to master, build prod image and scan

      stage('Master build & push') {
          agent { node { label 'docker' } }
          when { branch 'master' }
          steps {
             sh 'echo Building....'
          }
      }

      stage('Mirror to public Github') {
         agent any
         options { skipDefaultCheckout true }
         when { branch 'master' }
         steps {
            catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
               withCredentials([usernamePassword(credentialsId: 'git_creds', passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
                            sh 'rm -rf *'
                            sh 'git clone --mirror https://$HOME_REPO'
               }
               withCredentials([usernamePassword(credentialsId: 'github_creds', passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
                           dir("${PROJECT}.git"){
                                 sh 'git remote add --mirror=fetch github https://$GIT_USERNAME:$GIT_PASSWORD@$GITHUB_REPO'
                                 sh 'git push github --all'
                           }
               }
            }
         }
      }
   }