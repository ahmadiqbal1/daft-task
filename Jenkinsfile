pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // GitHub repository
                git 'https://github.com/ahmadiqbal1/daft-task.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install Node.js and npm
                sh 'curl -sL https://deb.nodesource.com/setup_14.x | bash -'
                sh 'apt-get install -y nodejs'

                // Install Cypress dependencies
                sh 'npm install'
            }
        }

        stage('Run Cypress Tests') {
            steps {
                // Run Cypress tests
                sh './node_modules/.bin/cypress run --browser chrome --config viewportWidth=1000,viewportHeight=660'
            }
        }
    }

    post {
        always {
            // Clean up or perform any other post-build tasks if needed
        }
    }
}
