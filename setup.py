#!/usr/bin/env python3
"""
TR Change System - Setup e Verificação do Ambiente
=====================================================

Script para verificar e configurar o ambiente do TR Change System.

Uso:
    python setup.py --check       # Apenas verificar o ambiente
    python setup.py --install     # Instalar dependências
    python setup.py --demo        # Gerar PPTX de demonstração

Dependências:
    - Python 3.8+
    - python-pptx (instalado automaticamente)
"""

import sys
import subprocess
from pathlib import Path
import json

def check_python():
    """Verificar versão do Python."""
    version = sys.version_info
    print(f"[OK] Python {version.major}.{version.minor}.{version.micro}")

    if version.major < 3 or (version.major == 3 and version.minor < 8):
        print("[ERRO] Python 3.8+ é necessário")
        return False
    return True

def check_dependencies():
    """Verificar se as dependências estão instaladas."""
    try:
        import pptx
        print(f"[OK] python-pptx {pptx.__version__}")
        return True
    except ImportError:
        print("[ERRO] python-pptx não instalado")
        return False

def install_dependencies():
    """Instalar dependências."""
    print("Instalando dependências...")
    try:
        subprocess.run([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"],
                      check=True, capture_output=True)
        print("[OK] Dependências instaladas com sucesso")
        return True
    except subprocess.CalledProcessError as e:
        print(f"[ERRO] Erro na instalação: {e}")
        return False

def check_project_structure():
    """Verificar estrutura do projeto."""
    required_dirs = [
        "templates/delivery-follow-up",
        "templates/diagnostico",
        "playbooks",
        "rituais",
        "guias"
    ]

    for dir_path in required_dirs:
        if Path(dir_path).exists():
            print(f"[OK] {dir_path}/")
        else:
            print(f"[ERRO] {dir_path}/ não encontrado")
            return False

    return True

def generate_demo():
    """Gerar PPTX de demonstração."""
    demo_file = Path("templates/delivery-follow-up/dados/dom-nio-cloud_sprint-08.json")
    if not demo_file.exists():
        print(f"[ERRO] Arquivo de demo não encontrado: {demo_file}")
        return False

    try:
        subprocess.run([
            sys.executable,
            "templates/delivery-follow-up/generate_pptx.py",
            str(demo_file),
            "demo-output.pptx"
        ], check=True, capture_output=True, text=True)

        print("[OK] PPTX de demonstração gerado: demo-output.pptx")
        return True
    except subprocess.CalledProcessError as e:
        print(f"[ERRO] Erro na geração: {e}")
        return False

def main():
    """Função principal do setup."""
    import argparse

    parser = argparse.ArgumentParser(description="Setup do TR Change System")
    parser.add_argument("--check", action="store_true", help="Verificar ambiente")
    parser.add_argument("--install", action="store_true", help="Instalar dependências")
    parser.add_argument("--demo", action="store_true", help="Gerar PPTX demo")

    args = parser.parse_args()

    if not any([args.check, args.install, args.demo]):
        # Se nenhuma opção foi especificada, fazer setup completo
        args.install = True
        args.check = True
        args.demo = True

    print("TR Change System - Setup")
    print("=" * 40)

    # Verificações básicas
    if not check_python():
        sys.exit(1)

    if not check_project_structure():
        sys.exit(1)

    # Instalar dependências se solicitado
    if args.install:
        if not install_dependencies():
            sys.exit(1)

    # Verificar dependências
    if args.check:
        if not check_dependencies():
            print("\nExecute: python setup.py --install")
            sys.exit(1)

    # Gerar demo se solicitado
    if args.demo:
        if not generate_demo():
            sys.exit(1)

    print("\n[OK] Setup concluído com sucesso!")
    print("\nPróximos passos:")
    print("- Leia o README.md para entender o projeto")
    print("- Explore os templates em templates/")
    print("- Consulte os playbooks em playbooks/")
    print("- Use 'python templates/delivery-follow-up/generate_pptx.py' para gerar PPTX")

if __name__ == "__main__":
    main()