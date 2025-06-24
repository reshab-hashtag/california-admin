import React, { useState,useEffect,useRef } from "react";
import { Button, Form, message } from "antd";
import Slider from './Slider';
import AboutUs from './AboutUs';
import OurTour from './OurTour';
import { addGallery } from "../../../config/apiFunctions";
import GalleryModal from "../../GalleryModal";
import OurVehicles from "../Home/OurVehicles";
import PhotoGallery from "../Home/PhotoGallery";
import { updatePageData,GetPageData } from "../../../config/apiFunctions";
import { useNavigate } from "react-router-dom";
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
interface TourData {  
  image: string;
  slug: string;
  header: string;
  content: string;  
}
interface vehicleData {
  image:string,
  header:string,
  content:string,
  passengercount:string
}
interface Vehicle {
  vehicletype: string;
  vehicledata: vehicleData[]
}
interface Photo {
  image: string;
}
interface formData {
  aboutus:{
    image:string;
    header:string;    
    secondheader:string;
    content:string;
    btnname:string;
    btnlink:string;
  },
  ourtour:{
    header:string;        
    content:string;
    ourtourdata: TourData[];
  },
  ourvehicles: Vehicle[];
  photogallary: {
    content: string;
    images: Photo[];
  };
  [key: string]: any;
}
const HomeTemplate: React.FC = () => {  
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [sliderData, setSliderData] = useState<InputBox[]>([{ id: 1, value: {"slider":"","sliderheader":"","bannercontent":"","bnrbtnnm":"","bnrbtnlink":""} }]);
  const [formData, setFormData] = useState<formData>({
    aboutus: {
      image: "",
      header: "",
      secondheader: "",
      content: "",
      btnname: "",
      btnlink: "",       
    },
    ourtour:{
      header:"",      
      content:"",
      ourtourdata: [
        {
          image: "",
          slug: "",
          header: "",
          content: ""
        }
      ]
    },
    ourvehicles:[
      {
        vehicletype:"",
        vehicledata:[
          {
            image:"",
            header:"",
            content:"",
            passengercount:"0"
          }
        ]
      }
    ],
    photogallary: {
      content: "",
      images: [
        {
          image: "",
        },
      ],
    },
  });
  const [nextId, setNextId] = useState(2);
  const formDataRef = useRef(formData);
  // ===========================Gallery Modal==============================
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [maxupload, setmaxupload] = useState<number>(0);
  const [uploadsec, setuploadsec] = useState<string>("");
  //const [loading, setLoading] = useState<boolean>(false);
  const [fileList, setFileList] = useState<any[]>([]);
  const [modalOpenId,setModalOpenId] = useState<number>();
  const [modalOpenSecId, setModalSecOpenId] = useState<number | null>(null);
  const [form] = Form.useForm();
  const openAddGalPopup = (id:number,maxupload:number,uploadsec:string,secId:number | undefined = undefined)=>{
      setModalOpenId(id)
      setIsModalOpen(true);
      setmaxupload(maxupload)
      setuploadsec(uploadsec)
      setModalSecOpenId(secId !== undefined ? secId : null)
  }
  
  const handleCancel = ()=>{
      setIsModalOpen(false);
  }
  const handleInputChange = async (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, 
    key: keyof formData
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [key]: { 
        ...prevData[key], 
        [name]: value 
      },
    }));
    
  };
  const handleInputChangeArray = async (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, 
    key: string, 
    index: number,
    seckey: keyof formData
  ) => {
    const { name,value } = event.target;
    
    setFormData((prevData) => ({
      ...prevData,
      [key]: {
        ...prevData[key],
        ourtourdata: prevData[key][seckey].map((item:any, idx:number) =>
          idx === index ? { ...item, [name]: value } : item
        ),
      },
    }));
  };
  const handleSubmitModal = async(values: any) => {
      setLoading(true)
      //console.log(values)
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
          console.log(uploadsec);
          if(uploadsec==="slider"){
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
          }else if (uploadsec === "about") {
            setFormData((prevData) => ({
              ...prevData,
              aboutus: { ...prevData.aboutus, image },
            }));
            console.log(formData)
          }
          else if(uploadsec==="ourtour"){
            // need to dynamic this section
            console.log(modalOpenId);
            setFormData((prevData) =>({
              ...prevData,
              ourtour: {
                ...prevData.ourtour,
                ourtourdata: prevData.ourtour.ourtourdata.map((item:any, idx:number) =>
                  idx === modalOpenId ? 
                    { ...item,  image } : item
                ),
              },
              })              
            );           
          }
          else if (uploadsec === "ourvehicle") {
            console.log(modalOpenSecId);
          
            setFormData((prevData) => ({
              ...prevData,
              ourvehicles: prevData.ourvehicles.map((item: any, idx: number) =>
                idx === modalOpenId
                  ? {
                      ...item,
                      vehicledata: item.vehicledata.map((val: any, key: number) =>
                        key === modalOpenSecId ? { ...val, image } : val
                      ),
                    }
                  : item
              ),
            }));
          }
          else if(uploadsec==="photogallery"){
            //console.log(saveGallery);
            //newData.splice(modalOpenId+1, 0, ...newSliderData);
            let newGaldata = saveGallery?.data?.filter((_:any,key:number)=> key!==0).map((val:any,index:number)=>(
              {
                image:val.image
              }
            ))
            if (newGaldata.length > 0 && modalOpenId !== undefined) {  
              setFormData((prevData) => ({              
                ...prevData, 
                photogallary: {
                  ...prevData.photogallary,                  
                    ...prevData.photogallary.images,
                    ...prevData.photogallary.images.splice(modalOpenId+1, 0, ...newGaldata)    
                            
                },             
              }));
            }
            console.log(newGaldata);
            setFormData((prevData) =>({
              ...prevData,
              photogallary: {
                ...prevData.photogallary,
                images: prevData.photogallary.images.map((item:any, idx:number) =>
                  idx === modalOpenId ? 
                    { ...item,  image } : item
                ),
              },
              })              
            );           
          }
        // ================================
          //console.log(saveGallery) 
          form.resetFields();
          setFileList([]);
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
    setFormData((prevData) => {
      const updatedData = { ...prevData, sliderdata: sliderData };  
      //let data = new FormData();
      //data.append("pagedata", JSON.stringify(updatedData));   
      formDataRef.current = updatedData;  
      return updatedData; 
    });
    let pageUpdate = updatePageData("home", formDataRef.current);
    message.success('Home page updated successfully');
    navigate('/pages')
  };

  const slideronChange = (id: number, event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("sliderData",sliderData)
    const { name, value } = event.target;
    setSliderData((prevData) =>
      prevData.map((item) => (item.id === id ? { ...item, value: { ...item.value, [name]: value } } : item))
    );
  };

  const updateSliderCount = (action: "add" | "remove", idToRemove?: number, section?: string) => {
    if(section==="slider"){
      if (action === "add") {
        setSliderData([...sliderData, { id: nextId, value: {"slider":"","sliderheader":"","bannercontent":"","bnrbtnnm":"","bnrbtnlink":""} }]);
        setNextId(nextId + 1);
      } else if (action === "remove" && idToRemove !== undefined) {
        setSliderData(sliderData.filter((item,index) => index !== idToRemove));
      }
    }
    if(section==="ourtour"){
      if (action === "add") {
        setFormData((prevFormData) => ({
          ...prevFormData,
          ourtour: {
            ...prevFormData.ourtour,
            ourtourdata: [
              ...prevFormData.ourtour.ourtourdata,
              { image: "",slug: "", header: "", content: "" }
            ]
          }
        }));
      } else if (action === "remove" && idToRemove !== undefined) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          ourtour: {
            ...prevFormData.ourtour,
            ourtourdata: prevFormData.ourtour.ourtourdata.filter((_, index) => index !== idToRemove)
          }
        }));
      }
    }
    if(section==="ourvehicle"){
      if (action === "add") {
        setFormData((prevFormData) => ({
          ...prevFormData,
          ourvehicles: [
              ...prevFormData.ourvehicles, 
              { vehicletype: "",vehicledata:[{image:"",content:"",header:"",passengercount:"0"}] } 
          ]
      }));
      } else if (action === "remove" && idToRemove !== undefined) {
        setFormData((prevFormData) => ({
          ...prevFormData,          
          ...prevFormData.ourvehicles,
          ourvehicles: prevFormData.ourvehicles.filter((_, index) => index !== idToRemove)
          
        }));
      }
    }
    if(section==="photogalarry"){
      if (action === "add") {
        setFormData((prevFormData) => ({
          ...prevFormData,
          photogallary: {
            ...prevFormData.photogallary,
            images: [
              ...prevFormData.photogallary.images,
              { image: ""}
            ]
          }
        }));
      } else if (action === "remove" && idToRemove !== undefined) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          photogallary: {
            ...prevFormData.photogallary,
            images: prevFormData.photogallary.images.filter((_, index) => index !== idToRemove)
          }
        }));
      }
    }
    
  };
  //===================================================== Ourtour Section ===============================================
  
  // ====================================================================================================================
  // ================================================== Our Vehicles Section ============================================
  const ourVehiclehandleInputChange = async (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, 
    index: number,
    type:string,
    seckey:number
  ) => {
    const { name,value } = event.target;  
    if(type==="firstkey") {
      setFormData((prevData) => ({
        ...prevData,      
        ...prevData.ourvehicles,
        ourvehicles: prevData.ourvehicles.map((item:any, idx:number) =>
          idx === index ? { ...item, [name]: value } : item
        ),
      }));
    }else{
      setFormData((prevData) => ({
        ...prevData,      
        ...prevData.ourvehicles,
        ourvehicles: prevData.ourvehicles.map((item:any, idx:number) =>
          idx === index ? { 
            ...item,
            vehicledata:item?.vehicledata?.map((val: any,key: Number ) =>
              key === seckey ? { ...val,[name]: value } : val
            )
          }:item
            
        ),
      }));
    }
  };
  const vehicleDataAddRow = async (
    action: "add" | "remove", 
    idToRemove?: number, 
    section?: string,
    seckey?: number
  )=>{
    if(section==="ourvehicledata"){
      if (action === "add") {
        setFormData((prevFormData) => ({
            ...prevFormData,
            ourvehicles: prevFormData.ourvehicles.map((vehicle, index) =>
                index === idToRemove
                ? {
                      ...vehicle,
                      vehicledata: [
                          ...(vehicle.vehicledata || []), 
                          { image: "", content: "", header: "", passengercount: "0" }
                      ]
                  }
                : vehicle
            )
        }));
      } else if (action === "remove" && idToRemove !== undefined) {
        setFormData((prevFormData) => ({
          ...prevFormData,          
          ourvehicles: prevFormData.ourvehicles.map((vehicle:any, index:number) =>
            index === idToRemove
            ?{
              ...vehicle.vehicledata,
              vehicledata : vehicle.vehicledata.filter((_:any, ind:number) => ind !== seckey)
            }:vehicle
        ) 
        }));
      }
    }
  }
  // =====================================================================================================================

  // ==================================================Gallery Section====================================================
  const PhotoGalInputChangeArray = async (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, 
    key: string, 
    index: number,
    seckey: string
  ) => {
    const { name,value } = event.target;
    //console.log(formData)
    setFormData((prevData) => ({
      ...prevData,
      [key]: {
        ...prevData[key],
        [seckey]: prevData[key][seckey].map((item:any, idx:number) =>
          idx === index ? { ...item, [name]: value } : item
        ),
      },
    }));
  };
  // =====================================================================================================================
  const getPageDetails = async() =>{
    await GetPageData("home").then((response)=>{      
      console.log("response1===>",response?.pagedata)

      let res = response?.pagedata
      setFormData(res)
      setSliderData(res?.sliderdata)
      setNextId((res?.sliderdata?.length+1))
    })
  }
  useEffect(() => {
    formDataRef.current = formData;
  }, [formData]);
  useEffect(() => {
    getPageDetails();
    //console.log(formData)
  },[])
  return (
    <>
        <div className="common_wrp line_wrp">
      <h1 style={{ marginBottom: "20px" }}>Page</h1>
      <Form layout="vertical" onFinish={handleSubmit}>
        {sliderData?.length > 0 && 
          <Slider
            sliderData={sliderData}
            slideronChange={slideronChange}
            updateSliderCount={updateSliderCount}          
            openAddGalPopup={openAddGalPopup}
          />
        }
        <AboutUs openAddGalPopup={openAddGalPopup} formData={formData} handleInputChange={handleInputChange}/>
        <OurTour 
          updateSliderCount={updateSliderCount} 
          formData={formData.ourtour}  
          handleInputChange={handleInputChange} 
          handleInputChangeArray={handleInputChangeArray} 
          openAddGalPopup={openAddGalPopup}
        />
        <OurVehicles 
          ourvehicles={formData.ourvehicles}
          updateSliderCount={updateSliderCount}
          ourVehiclehandleInputChange={ourVehiclehandleInputChange}
          openAddGalPopup={openAddGalPopup}  
          vehicleDataAddRow={vehicleDataAddRow}
          />
         <PhotoGallery 
          photogallery={formData.photogallary}
          openAddGalPopup={openAddGalPopup}
          handleInputChange={handleInputChange}
          updateSliderCount={updateSliderCount}
          PhotoGalInputChangeArray={PhotoGalInputChangeArray}
         />
        <Form.Item>
          <Button className="cssbuttons-io-button" type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
      <GalleryModal
            isModalOpen={isModalOpen}
            handleSubmit={handleSubmitModal}
            handleCancel={handleCancel}
            handleUploadChange={handleUploadChange}
            fileList={fileList}
            loading={loading}
            maxupload={maxupload}
            form={form}
        />
        </div>
    </>
  );
};

export default HomeTemplate;