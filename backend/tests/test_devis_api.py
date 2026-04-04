"""
Backend API tests for Agence Prela - Devis endpoint
Tests the POST /api/devis endpoint for quote requests
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestDevisAPI:
    """Tests for the /api/devis endpoint"""
    
    def test_health_check(self):
        """Test that the API root is accessible"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        print(f"✓ API root accessible: {data}")
    
    def test_create_devis_success(self):
        """Test creating a devis request with all required fields"""
        payload = {
            "nom": "TEST_Jean Dupont",
            "email": "test@example.com",
            "telephone": "0612345678",
            "type_projet": "Construction neuve",
            "description": "Test project description for automated testing",
            "localisation": "Paris",
            "budget": "50000€"
        }
        
        response = requests.post(
            f"{BASE_URL}/api/devis",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        # Verify response structure
        assert "id" in data, "Response should contain 'id'"
        assert data["nom"] == payload["nom"], f"Expected nom '{payload['nom']}', got '{data.get('nom')}'"
        assert data["email"] == payload["email"], f"Expected email '{payload['email']}', got '{data.get('email')}'"
        assert data["type_projet"] == payload["type_projet"]
        assert data["description"] == payload["description"]
        assert "timestamp" in data
        print(f"✓ Devis created successfully with id: {data['id']}")
    
    def test_create_devis_minimal_fields(self):
        """Test creating a devis with only required fields"""
        payload = {
            "nom": "TEST_Minimal User",
            "email": "minimal@test.com",
            "type_projet": "Rénovation",
            "description": "Minimal test description"
        }
        
        response = requests.post(
            f"{BASE_URL}/api/devis",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
        
        data = response.json()
        assert data["nom"] == payload["nom"]
        assert data["email"] == payload["email"]
        # Optional fields should be None or not present
        assert data.get("telephone") is None or data.get("telephone") == ""
        print(f"✓ Devis with minimal fields created: {data['id']}")
    
    def test_create_devis_missing_required_field(self):
        """Test that missing required fields return validation error"""
        payload = {
            "nom": "TEST_Missing Email",
            # Missing email
            "type_projet": "Extension",
            "description": "Test description"
        }
        
        response = requests.post(
            f"{BASE_URL}/api/devis",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        
        # Should return 422 Unprocessable Entity for validation error
        assert response.status_code == 422, f"Expected 422 for missing required field, got {response.status_code}"
        print(f"✓ Validation error returned for missing required field")
    
    def test_get_devis_list(self):
        """Test retrieving list of devis requests"""
        response = requests.get(f"{BASE_URL}/api/devis")
        
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        
        data = response.json()
        assert isinstance(data, list), "Response should be a list"
        print(f"✓ Retrieved {len(data)} devis requests")
        
        # If there are items, verify structure
        if len(data) > 0:
            item = data[0]
            assert "id" in item
            assert "nom" in item
            assert "email" in item
            print(f"✓ Devis list item structure verified")
    
    def test_all_project_types(self):
        """Test that all project types from frontend are accepted"""
        project_types = [
            "Construction neuve",
            "Rénovation",
            "Extension",
            "Permis de construire",
            "Déclaration préalable",
            "Aménagement",
            "Autre"
        ]
        
        for project_type in project_types:
            payload = {
                "nom": f"TEST_Type_{project_type[:10]}",
                "email": f"test_{project_type[:5].lower()}@test.com",
                "type_projet": project_type,
                "description": f"Testing project type: {project_type}"
            }
            
            response = requests.post(
                f"{BASE_URL}/api/devis",
                json=payload,
                headers={"Content-Type": "application/json"}
            )
            
            assert response.status_code == 200, f"Failed for project type '{project_type}': {response.text}"
        
        print(f"✓ All {len(project_types)} project types accepted")


class TestStatusAPI:
    """Tests for the /api/status endpoint (existing functionality)"""
    
    def test_create_status(self):
        """Test creating a status check"""
        payload = {"client_name": "TEST_StatusClient"}
        
        response = requests.post(
            f"{BASE_URL}/api/status",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        
        assert response.status_code == 200
        data = response.json()
        assert data["client_name"] == payload["client_name"]
        print(f"✓ Status check created: {data['id']}")
    
    def test_get_status_list(self):
        """Test retrieving status checks"""
        response = requests.get(f"{BASE_URL}/api/status")
        
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ Retrieved {len(data)} status checks")


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
