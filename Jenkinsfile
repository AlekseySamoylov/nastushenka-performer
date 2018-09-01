node {
    try {
        def app
        stage('Clone repository') {
            checkout scm
        }
        stage('Build') {
            sh 'bash ./build.sh'
        }
        stage('Build Docker image') {
            app = docker.build("alekseysamoylov/nastushenka_performer", "-f ./Dockerfile .")
        }
        stage('Push image') {
            docker.withRegistry('https://registry.hub.docker.com', 'my-docker-hub') {
                app.push("${env.BUILD_NUMBER}")
                app.push("latest")
            }
        }
    } finally {
        stage('cleanup') {
            echo "doing some cleanup..."
        }
    }
}
