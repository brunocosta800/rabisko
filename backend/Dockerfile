# Estágio de Desenvolvimento
FROM eclipse-temurin:21

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia apenas o arquivo de definição do Maven primeiro para aproveitar o cache das camadas do Docker
COPY pom.xml .
# Baixa as dependências (isso agiliza o build nas próximas vezes)
RUN ./mvnw dependency:go-offline -B || true

# O código fonte não é copiado via COPY para desenvolvimento,
# pois usaremos volumes no docker-compose para refletir mudanças em tempo real.

# Porta padrão do Spring Boot
EXPOSE 8080
# Porta para Debug remoto (caso queiram conectar a IDE)
EXPOSE 5005

# Comando para rodar a aplicação em modo de desenvolvimento
# O Spring Boot DevTools deve estar no seu pom.xml para o hot reload funcionar
CMD ["./mvnw", "spring-boot:run", "-Dspring-boot.run.jvmArguments='-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005'"]