# **App Name**: StudyVerse Live Class

## Core Features:

- Data Fetching: Fetches live class data from the provided API endpoint: https://livedatanexttopper.vercel.app/api/live/eleak
- Schedule Rendering: Dynamically renders class schedules based on the fetched data.
- Visibility Control: Hides class entries if their 'classVisible' property is false in the API data.
- Time-based Activation: Makes class entries clickable only when the current device local time falls within the class's start and end times.
- Live Stream Redirection: Clicking an active class entry redirects the user to the corresponding live stream URL.

## Style Guidelines:

- Primary color: Deep purple (#6750A4) to evoke a sense of learning and focus.
- Background color: Dark grey (#121212) to complement the dark theme requested.
- Accent color: Soft lavender (#D0BCFF) to provide visual contrast and highlight interactive elements.
- Body and headline font: 'Inter', a grotesque-style sans-serif for a modern, neutral look.
- Subtle transitions and hover effects to enhance user interaction and provide feedback on clickable elements.
- Clear and intuitive layout with emphasis on readability and ease of navigation.