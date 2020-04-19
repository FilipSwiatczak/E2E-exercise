pipeline {
    // Typically you want to put this Jenkinsfile into your Front end branch/repository
    // Then you execute an agent dedicated to building that front end
    // And for E2E stage specifically you call a different agent dedicated to Automation runs -> separation of run time environments
    options { disableConcurrentBuilds() }
    environment {
        // in case you use BROWSERSTACK_BUILD, similar with SauceLabs
        BROWSERSTACK_BUILD = "Pipeline = ${JOB_NAME} ${BUILD_DISPLAY_NAME}"
    }
    agent {
        node {
            label 'DevBuildAgent'
        }
    }
    stages {
        stage('NPM Install'){
            steps {
                // this will be bat or powershell for windows envs
                sh 'npm ci'
            }
        }
        stage('Static Code Analysis'){
            parallel {
                stage('NG Lint'){
                    steps {
                        sh 'ng lint'
                    }
                }
                stage('Stylelint'){
                    steps {
                        sh 'npm run stylelint'
                    }
                }
                stage('NPM Audit'){
                // this is informational, not implemented here. There is a neat npm-audit-html package which creates pretty report right inside blue ocean's Artifacts
                    steps {
                        sh 'npm audit --json | npm-audit-html --output .tmp/npmAuditReport.html'
                        publishHTML([allowMissing: false, alwaysLinkToLastBuild: true, keepAll: true, includes: '.tmp/**/*,**/**/*', reportDir: '.tmp', reportFiles: 'npmAuditReport.html', reportName: 'NPM Audit Report', reportTitles: ''])
                    }
                }
                stage('Unit test'){
                    steps{
                        sh 'npm run test'
                    }
                    post {
                    // by making sure our Unit tests produce .xml result files (ex. karma-junit-reporter), we get to utilise Jenkins Test tracking and Tests tab in Blue Ocean, with below 'junit'
                        always {
                            junit 'coverage/junit/*.xml'
                            publishHTML([allowMissing: false, alwaysLinkToLastBuild: true, keepAll: true, includes: 'coverage/**/*,**/**/*', reportDir: 'coverage/', reportFiles: 'index.html', reportName: 'Code coverage', reportTitles: ''])
                        }
                    }
                }
                stage('SonarQube') {
                    steps{
                        sh 'Your sonarQube call'
                    }
                }
            }
        }
        stage('Build'){
            steps {
                sh 'ng build --yourArguments'
            }
        }
        stage('Deploy to QA'){
            // with Blue Ocean and multibranch approach you can control which section of pipeline to run on which branches
            // ex. you might want to promote to QA env only after PR is merged to develop
            when {
                branch 'develop'
            }
            steps {
                sh 'deploy script'
            }
        }
        stage('E2E Testing'){
            // simplified for demonstration
            when {
                branch 'develop'
            }
            agent {
                node {
                    label 'TestAutomation'
                }
            }
            steps {
                checkout(['checkout instructions'])
                sh 'npm i'
                sh 'npm run test'
            }
        }
    }
}