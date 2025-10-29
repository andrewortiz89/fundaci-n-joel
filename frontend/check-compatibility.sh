#!/bin/bash

echo "🔍 Verificando compatibilidad..."

# Verificar Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker no está instalado"
    exit 1
fi
echo "✅ Docker instalado: $(docker --version)"

# Verificar Docker Compose
if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    echo "❌ Docker Compose no está instalado"
    exit 1
fi
echo "✅ Docker Compose instalado"

# Verificar permisos
if [ ! -w "$(pwd)" ]; then
    echo "❌ No tienes permisos de escritura en el directorio actual"
    exit 1
fi
echo "✅ Permisos correctos"

echo "✅ Sistema compatible - puedes ejecutar: docker-compose up"