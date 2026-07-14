const API_BASE_URL = 'https://about-me-automation-backend.azurewebsites.net/api';

export const fetchWithErrorHandling = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
        const text = await response.text();
        try {
            // Try to parse error as JSON
            const json = JSON.parse(text);
            throw new Error(json.message || `HTTP error! status: ${response.status}`);
        } catch (e) {
            // If parsing fails, use text or status
            throw new Error(text || `HTTP error! status: ${response.status}`);
        }
    }
    return response.json();
};

export const API_ENDPOINTS = {
    TEST_RUNS_SUMMARY: `${API_BASE_URL}/test-runs/summary`,
    TEST_RUN_DETAILS: (id: string) => `${API_BASE_URL}/test-runs/${id}`
};
