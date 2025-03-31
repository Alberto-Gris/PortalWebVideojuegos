import pytest
import servidor.App.main as main

def test_verify_password():
    assert main.verify_password("hola123", "$2b$12$7lWPdiKAltf4c3DxL55iDeYtqweHd/BZsw97B3FlB1iK2Wb2SqgF6") == True