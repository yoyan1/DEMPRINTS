
export function onFileChange (event) {
    const file = event.target.files[0];
    let image;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        image = reader.result; 
      };
      reader.readAsDataURL(file); 
      return image
    }
};