pipeline {
    agent any

    stages {
        stage('build-client') {
            agent {
                docker {
                    image 'cirrusci/flutter:stable'
                    reuseNode true
                }
            }
            steps {
                dir('client') {
                    sh '''
                    flutter --version
                    flutter pub get
                    flutter build apk --release
                    ls -la build/app/outputs/flutter-apk/
                    '''
                }
            }
        }
        stage('build-adminPannel') {
            agent {
                docker {
                    image 'node:18-alpine'
                    reuseNode true
                }
            }
            steps {
                dir('adminPannel') {
                    sh '''
                    ls -la
                    node --version
                    npm --version
                    npm ci
                    npm run build
                    ls -la build
                    '''
                }
            }
        }
        stage('test-client') {
            agent {
                docker {
                    image 'cirrusci/flutter:stable'
                    reuseNode true
                }
            }
            steps {
                dir('client') { 
                    sh '''
                    flutter test
                    '''
                }
            }
        }
        stage('test-adminPannel') {
            agent {
                docker {
                    image 'node:18-alpine'
                    reuseNode true
                }
            }
            steps {
                dir('adminPannel') {
                    sh '''
                    npm test
                    '''
                }
            }
        }
    }
}