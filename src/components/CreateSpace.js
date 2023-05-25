import React,{ useState } from "react"; 	
import { useNavigate } from "react-router-dom"; 				

const formState = {					
name: "",					
size: "",					
image_url: "",					
location: "",					
space_type: "",					
lease_cost: "",									
user_id: 2,										
};	

const formStyle = {
    width: "40%",
    border: "grey solid 1px",
    borderRadius: "11px",
    padding: "40px"
    
    };
					
function CreateSpace({ onAddSpace }) {					
const navigate = useNavigate();
const [formData, setFormData] = useState(formState);					
					
function handleChange(e) {					
setFormData({					
 ...formData,					
 [e.target.id]: e.target.value,					
});					
}					
					
function handleSubmit(e) {					
   e.preventDefault();					
   fetch("http://localhost:3000/spaces", {					
   method: "POST",					
   headers: {					
   "Content-Type": "application/json",					
   },					
   body: JSON.stringify(formData),					
   })					
    .then((r) => r.json())					
    .then((newSpace) => {	
       onAddSpace(newSpace);				
       setFormData(formState);		
    //    navigate(`/spaces/${newSpace.id}`)										
   })	
  }					
					
return (		
<>		

<div className="form-container container-fluid" style={formStyle}>	
	
<section>					
<h2> Add Your Property </h2>					
</section>					
					
<form className="row gy-2 gx-3 align-items-left">
<div className="mb-3">				
  <label htmlFor="name"> 
  Name  
  </label>					
  <input					
      type="text"					
      id="name"				
      value={formData.name}					
      onChange={handleChange}					
  />	
</div>

<div className="mb-3">
 <label htmlFor="size"> Size </label>					
 <input					
    type="text"					
    id="size"					
    value={formData.size}					
    onChange={handleChange}					
/>	
</div>

<div className="mb-3">
<label htmlFor="image_url"> Image URL  </label>					
<input					
    type="text"					
    id="image_url"					
    value={formData.image_url}					
    onChange={handleChange}					
/>	
</div>

<div className="mb-3">
<label htmlFor="location"> Location </label>					
<input					
     type="text"					
     id="location"					
     value={formData.location}					
     onChange={handleChange}					
/>		
</div>

<div className="mb-3">
<label htmlFor="space_type"> Space Type </label>					
<textarea					
     id="space_type"					
     value={formData.space_type}					
     onChange={handleChange}					
/>	
</div>

<div className="mb-3">
<label htmlFor="lease_cost"> Lease Cost </label>					
<input					
    type="text"					
    id="lease_cost"					
    value={formData.lease_cost}					
    onChange={handleChange}					
/>		
</div>					

<div className="col-auto">
<button type="submit"
onClick = {handleSubmit} 
className="btn btn-primary">
    Add My Property
    </button>							
</div>	

<section>					
<h5> By clicking Add My Property above, I agree that I have provided accurate and non-discriminatory information. I comply with the BizzSpace Terms and Conditions and the Terms of Service. </h5>
</section>	

</form>
</div>
</>			
);					
}					
				
export default CreateSpace;					