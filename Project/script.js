Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('models'),
  ]).then(startVideo);
  
  Promise.all([
    faceapi.nets.ssdMobilenetv1.loadFromUri('models'),
  ]).then(startInference);
  
  function startInference() {
    // Perform face-related tasks here
  }
  
  // Start the video stream from the user's camera
  function startVideo() {
    navigator.getUserMedia(
      { video: {} },
      stream => video.srcObject = stream,
      error => console.error(error)
    );
  }
  
  // Process the video frames for face recognition
  video.addEventListener('play', () => {
    const canvas = faceapi.createCanvasFromMedia(video);
    document.body.appendChild(canvas);
    const displaySize = { width: video.width, height: video.height };
    faceapi.matchDimensions(canvas, displaySize);
  
    setInterval(async () => {
      const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors();
      const labeledFaceDescriptors = await loadLabeledImages();
      const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6);
  
      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
      const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor));
  
      results.forEach((result, i) => {
        const box = resizedDetections[i].detection.box;
        const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() });
        drawBox.draw(canvas);
  
        if (result.distance < 0.6) {
          document.getElementById('popUpButton').classList.remove('hidden');
        } else {
          document.getElementById('popUpButton').classList.add('hidden');
        }
      });
    }, 100);
  });
  
  // Load labeled images for face recognition
  async function loadLabeledImages() {
    const labelsWithPaths = [
      { label: 'AAYUSH', path: 'label/ays.png' }, // Add more labels and paths as needed
      { label: 'DHONI', path: 'label/319946.webp' },
      { label: 'VIRAT', path: 'label/licensed-image.jpeg'},
      { label: 'SHASHWAT', path: 'label/shas.jpg'},
      
      // Add more labels and paths as needed
    ];
  
    const labeledFaceDescriptors = await Promise.all(
      labelsWithPaths.map(async ({ label, path }) => {
        const descriptions = [];
        const img = await faceapi.fetchImage(path);
        const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
        descriptions.push(detections.descriptor);
        return new faceapi.LabeledFaceDescriptors(label, descriptions);
      })
    );

    return labeledFaceDescriptors;
  }
  