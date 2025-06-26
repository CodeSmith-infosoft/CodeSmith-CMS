import { useEffect } from "react";
import ErrorMessage from "../ErrorMessage";
import { SubCategoriestModalPropsType } from "@/types/caseStudyTypes";

const AddSubCategoryModal = ({
  register,
  errors,
  item,
  setValue,
}: SubCategoriestModalPropsType) => {
  // const [fileList, setFileList] = useState<any | null>(null);
  // const handleUpload = async (newFileList: any, field: any) => {
  //   const data = newFileList[0];
  //   field.onChange(data.blobFile);
  //   setFileList([{ ...data, url: toBase64(newFileList[0].blobFile) }]);
  // };

  useEffect(() => {
    if (item?._id) {
      setValue("name", item.name);
      // setValue("image", import.meta.env.VITE_IMAGE_DOMAIN + item.image);
      // setFileList([
      //   {
      //     url: import.meta.env.VITE_IMAGE_DOMAIN + item.image,
      //     name: item.image.split("/").at(-1),
      //   },
      // ]);
    } else {
      setValue("name", "");
      // setValue("image", "");
    }
  }, [item]);

  // const categoryStatusChange = (id: string, isActive: boolean) => {
  //   // setLoading(id);
  //   inActiveCategory(id, isActive)
  //     .then((res) => {
  //       const toast2 = res.success ? toast.success : toast.error;
  //       toast2(res.message);
  //       if (res.success) {
  //         // getCategoryData();
  //       }
  //     })
  //     // .finally(() => setLoading(""));
  // };

  return (
    <div className="add-subcatagory">
      {/* <div className="categoryToggle">
        <label className="toggel-label">Category Visibility</label>
        <Form>
          <Form.Check
            type="switch"
            id="custom-switch"
            // checked={value}
            // onChange={() => categoryStatusChange(item._id, !value)}
            className="red-toggle"
          /> Visible on site
        </Form>
      </div> */}
      <div className="add-subcatagory-container">
        <h2>{item?.name ? "Update" : "Add"} Sub Category</h2>
        <p>Sub Category Name</p>
        <input type="text" placeholder="Green Tea" {...register("name")} />
        <ErrorMessage message={errors.name?.message} />
        {/* <p>Image</p>
        <div className="img-upload rsuite-image-upload-field">
          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <Uploader
                onChange={(fileList) => handleUpload(fileList, field)}
                listType="picture-text"
                multiple={true}
                action=""
                accept="image/*"
                fileList={fileList}
              >
                <div className="upload-trigger">
                  <Button
                    appearance="ghost"
                    color="red"
                    className="add-file-btn"
                  >
                    Add File
                  </Button>
                  <div className="drag-text">Or drag and drop files</div>
                </div>
              </Uploader>
            )}
          />
          <ErrorMessage message={errors.image?.message} />
        </div> */}
      </div>
    </div>
  );
};

export default AddSubCategoryModal;
