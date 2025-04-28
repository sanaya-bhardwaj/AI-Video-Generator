const PEXELS_API_KEY = 'PTzsoWTqySbv1gM7d3WRkdhm0n2bRcnBblZDn2t2yQ5QKFbWZ4TDXp5Y';

function refineText(userInput) {
    const basicRefinements = {
        "car": "luxury car",
        "cat": "fluffy cat",
        "city": "beautiful cityscape",
        "nature": "breathtaking nature",
        "beach": "sunny beach",
        "mountain": "majestic mountains",
        "food": "delicious food",
        "flower": "colorful flowers",
        "technology": "advanced technology"
    };

    const lowerInput = userInput.trim().toLowerCase();
    return basicRefinements[lowerInput] || userInput; 
}

async function generateVideo() {
    const userInput = document.getElementById('userInput').value;
    const loading = document.getElementById('loading');
    const outputVideo = document.getElementById('outputVideo');

    if (!userInput) {
        alert("Please enter a topic!");
        return;
    }

    loading.style.display = "block";
    outputVideo.style.display = "none";

    try {
        const refinedInput = refineText(userInput);

        const response = await fetch(`https://api.pexels.com/videos/search?query=${encodeURIComponent(refinedInput)}&per_page=1`, {
            headers: {
                Authorization: PEXELS_API_KEY
            }
        });
        const data = await response.json();

        if (data.videos.length > 0) {
            const videoUrl = data.videos[0].video_files.find(file => file.quality === 'sd' || file.quality === 'hd').link;
            outputVideo.src = videoUrl;
            outputVideo.style.display = "block";
            outputVideo.style.opacity = "1";   
        } else {
            alert("No videos found for this topic. Try something else!");
        }
        

    } catch (error) {
        console.error("Error generating video:", error);
        alert("Something went wrong. Try again!");
    } finally {
        loading.style.display = "none";
    }
}
