import { openUploadWidget } from "../../utils/CloudinaryService";

const CloudinaryUpload = ({setUrl}) => {
  const uploadImageWidget = () => {
    let myUploadWidget = openUploadWidget(
      {
        cloudName: 'doitleqcw',
        uploadPreset: 'anything',      //It should be kept in secret and not to be shared publicly -- in future keep it in private space using env.
        sources: ["local"]
      },
      function (error, result) {
        if (!error && result.event === "success") {
          setUrl(result.info.secure_url);
          
        }
        else if(error) {
            console.log("Failed to select track" + error);
        }
      }
    );
    myUploadWidget.open();
  };

  return (
    <button className="greenButton bg-white p-2 rounded-full " onClick={uploadImageWidget}>
      Select Track
    </button>
  );
};

export default CloudinaryUpload;
