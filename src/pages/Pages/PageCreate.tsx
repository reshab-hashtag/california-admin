import React, { useState } from "react";
import { Button, Form } from "antd";
import Slider from './Home/Slider';
import AboutUs from './Home/AboutUs';
import { addGallery } from "../../config/apiFunctions";
import GalleryModal from "../GalleryModal";

interface InputBox {
  id: number;
  value: {
    slider: string;
    sliderheader: string;
    bannercontent: string;
    bnrbtnnm: string;
    bnrbtnlink: string;
  };
}

const PageCreate: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [sliderData, setSliderData] = useState<InputBox[]>([{ id: 1, value: {"slider":"","sliderheader":"","bannercontent":"","bnrbtnnm":"","bnrbtnlink":""} }]);
  const [nextId, setNextId] = useState(2);

  // ===========================Gallery Modal==============================
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  //const [loading, setLoading] = useState<boolean>(false);
  const [fileList, setFileList] = useState<any[]>([]);
  const [modalOpenId,setModalOpenId] = useState<number>();
  const [form] = Form.useForm();
  const openAddGalPopup = (id:number)=>{
      setModalOpenId(id)
      setIsModalOpen(true);
  }
  const handleCancel = ()=>{
      setIsModalOpen(false);
  }
  const handleSubmitModal = async(values: any) => {
      setLoading(true)
      console.log(values)
      try{
          let formData = new FormData();
          formData.append("alttag",values.alttag)
          //console.log(values.image);return false;
          fileList.forEach((file, index) => {
              formData.append(`images`, file.originFileObj);
          });
          let saveGallery = await addGallery(formData)
          console.log(saveGallery)
          const image = saveGallery.data[0].image;

          // need to dynamic this section
          console.log(modalOpenId);
          setSliderData((prevData) =>
            prevData.map((item,index) =>
              index === modalOpenId
                ? { ...item, value: { ...item.value, slider: image } }
                : item
            )
          );

          let newId = nextId;
          const newSliderData = saveGallery?.data
          .filter((val:any, index:number) => index !== 0) 
          .map((val: any) => ({
            id: newId++, 
            value: { 
              slider: val.image, 
              sliderheader: "", 
              bannercontent: "", 
              bnrbtnnm: "", 
              bnrbtnlink: "" 
            }
          }));
          //console.log("newSliderData========",newSliderData)
        if (newSliderData.length > 0 && modalOpenId !== undefined) {  
          setSliderData((prevData) => {
            const newData = [...prevData];
            newData.splice(modalOpenId+1, 0, ...newSliderData);
            return newData;
          });
          setNextId(nextId)
        }
        // ================================
          //console.log(saveGallery) 
          form.resetFields();
          setIsModalOpen(false);
          setLoading(false)
      }
      catch(err){
          console.log(err)
          setLoading(true)
      }
  }
  const handleUploadChange = ({ fileList }: { fileList: any[] }) => {
      setFileList(fileList);
  };
  // =======================================================================
  const handleSubmit = () => {
    console.log(sliderData);
  };

  const slideronChange = (id: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSliderData((prevData) =>
      prevData.map((item) => (item.id === id ? { ...item, value: { ...item.value, [name]: value } } : item))
    );
  };

  const updateSliderCount = (action: "add" | "remove", idToRemove?: number) => {
    if (action === "add") {
      setSliderData([...sliderData, { id: nextId, value: {"slider":"","sliderheader":"","bannercontent":"","bnrbtnnm":"","bnrbtnlink":""} }]);
      setNextId(nextId + 1);
    } else if (action === "remove" && idToRemove !== undefined) {
      setSliderData(sliderData.filter((item,index) => index !== idToRemove));
    }
  };




  return (
    <>
      <h1 style={{ marginBottom: "20px" }}>Page</h1>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Slider
          sliderData={sliderData}
          slideronChange={slideronChange}
          updateSliderCount={updateSliderCount}
          // isModalOpen={isModalOpen} 
          // handleSubmitModal={handleSubmitModal} 
          // handleCancel={handleCancel} 
          // handleUploadChange={handleUploadChange} 
          // fileList={fileList} 
          // loading={loading}
          openAddGalPopup={openAddGalPopup}
        />
        {/* <AboutUs openAddGalPopup={openAddGalPopup}/> */}
        <Form.Item>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
      <GalleryModal
            isModalOpen={isModalOpen}
            handleSubmit={handleSubmitModal}
            handleCancel={handleCancel}
            handleUploadChange={handleUploadChange}
            fileList={fileList}
            loading={loading}
            maxupload={5}
            form={form}
        />
    </>
  );
};

export default PageCreate;

