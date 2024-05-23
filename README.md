# [VisionGPT](https://visiongpt.vercel.app) - analyze your image with AI

Analyze and understand images in seconds. Get AI-driven insights at your fingertips.

## How it works

VisionGPT uses the Gemini Pro Vision model to analyze images. Simply upload any photo, and this application will process it through the model using a Next.js API route, returning an analysis of your image.

## Running Locally

### Cloning the repository the local machine.

```bash
git clone https://github.com/megoxv/visionGPT
```

### Setting Up the Environment Variables

Create a `.env` file in the root directory of the project. Store your API key in it as shown in the `.example.env` file.

```bash
NEXT_PUBLIC_DOMAIN_URL="http://localhost:3000"

NEXT_PUBLIC_DOMAIN_URL="http://localhost:3000"

# Create your API key here: https://aistudio.google.com/app/apikey
NEXT_PUBLIC_GOOGLE_AI_API_KEY="YOUR_GOOGLE_AI_API_KEY"

GOOGLE_CLIENT_ID="YOUR_GOOGLE_CLIENT_ID"
GOOGLE_CLIENT_SECRET="YOUR_GOOGLE_CLIENT_SECRET"

# STRIPE
STRIPE_SECRET_KEY="YOUR_STRIPE_SECRET_KEY"
STRIPE_WEBHOOK_SECRET="YOUR_STRIPE_WEBHOOK_SECRET"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="YOUR_STRIPE_PUBLISHABLE_KEY"

DATABASE_URL="YOUR_DATABASE_URL"
```

### Installing the dependencies.

```bash
npm install
```

### Running the application.

Then, run the application in the command line and it will be available at `http://localhost:3000`.

```bash
npm run dev
```

## License

This repo is MIT licensed.
