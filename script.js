document.getElementById('fileConverterForm').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const fileInput = document.getElementById('fileUpload');
    const file = fileInput.files[0];
  
    if (!file) {
      alert('Por favor, faça o upload de um arquivo.');
      return;
    }
  
    const reader = new FileReader();
    reader.onload = function(e) {
      const fileContent = e.target.result;
  
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF();
  
      if (file.type === "text/plain") {
        pdf.text(10, 10, fileContent);
      } else if (file.type === "image/jpeg" || file.type === "image/png") {
        const img = new Image();
        img.src = fileContent;
  
        img.onload = function() {
          const width = img.width / 10;
          const height = img.height / 10;
          pdf.addImage(img, 'JPEG', 10, 10, width, height);
          gerarLinkDownload(pdf);
        };
        return;
      }
  
      gerarLinkDownload(pdf);
    };
  
    if (file.type === "image/jpeg" || file.type === "image/png") {
      reader.readAsDataURL(file);
    } else {
      reader.readAsText(file);
    }
  });
  
  function gerarLinkDownload(pdf) {
    const pdfOutput = pdf.output('blob');
    const url = URL.createObjectURL(pdfOutput);
  
    const downloadLink = document.getElementById('downloadLink');
    downloadLink.href = url;
    downloadLink.style.display = 'block';
  }
  
