# Image Uploading Site

A simple image uploading website built using Django for the backend and Angular for the frontend.

[Project Demo.webm](https://github.com/vamsivallepu/my-gallery/assets/53989958/35ed6285-2cf8-4ab7-9120-204b738f5e4c)


## Getting Started

Follow these steps to set up the project on your local machine.

### Prerequisites

Make sure you have the following installed:

- Python 3.8 or higher
- Node.js 
- Angular CLI

### Backend Setup (Django)

1. Clone this repository:
   ```bash
   git clone https://github.com/vamsivallepu/my-gallery.git
   cd my-gallery/backend
   ```
2. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   source venv/bin/activate
   ```
3. Install the backend dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Apply database migrations:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```
5. Run the Django development server:
   ```bash
   python manage.py runserver
   ```
## Frontend Setup (Angular)

1. Navigate to the frontend directory:
   ```bash
   cd my-gallery/frontend
   ```
2. Install the frontend dependencies:
   ```bash
    npm install
    ```
3. Start the Angular development server:
   ```bash
   ng serve
   ```

## Usage
- Access the site by navigating to http://localhost:4200 in your web browser.

## Features
- User authentication and registration
- Upload images with a title and description
- View all images uploaded by a user in a 4 x 4 grid
- View a single image in detail
- Option to delete an image
