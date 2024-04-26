import Swal from 'sweetalert2'

const AddCoffee = () => {

    const handleSubmit = e =>{
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const quantity = form.quantity.value;
        const supplier = form.supplier.value;
        const taste = form.taste.value;
        const category = form.category.value;
        const details = form.details.value;
        const photo = form.photo.value;

        const newCoffee = {
            name, quantity, supplier, taste, category, details, photo
        }
        console.log(newCoffee);
        
        
        fetch('http://localhost:5000/coffee',{
            method: 'POST',
            headers:{
                'content-type' : "application/json"
            },
            body: JSON.stringify(newCoffee)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.insertedId){
                
                Swal.fire({
                    title: 'Success!',
                    text: 'YOU have added the coffee successfully',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                  })
            }
        })

    }
    return (
       <div>
        <section className="p-6 bg-gray-800 text-gray-50">
	<form onSubmit={handleSubmit} className="container flex flex-col mx-auto space-y-12">
		<fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-gray-900">
			<div className="space-y-2 col-span-full lg:col-span-1">
				<p className="font-medium">Add a new Coffee</p>
				<p className="text-xs">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci fuga autem eum!</p>
			</div>
			<div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
				<div className="col-span-full sm:col-span-3">
					<label htmlFor="name" className="text-sm">Name</label>
					<input name="name" id="name" type="text" placeholder="Name" className="w-full rounded-md focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-violet-400 border-gray-700" />
				</div>
				<div className="col-span-full sm:col-span-3">
					<label htmlFor="chef" className="text-sm">Quantity</label>
					<input name="quantity" type="text" placeholder="quantity" className="w-full rounded-md focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-violet-400 border-gray-700" />
				</div>

				<div className="col-span-full sm:col-span-3">
					<label className="text-sm">Supplier</label>
					<input name="supplier" id="supplier" type="text" placeholder="Supplier" className="w-full rounded-md focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-violet-400 border-gray-700" />
				</div>

				<div className="col-span-full">
					<label htmlFor="address" className="text-sm">Taste</label>
					<input name="taste" id="address" type="text" placeholder="" className="w-full rounded-md focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-violet-400 border-gray-700" />
				</div>

				<div className="col-span-full sm:col-span-2">
					<label htmlFor="city" className="text-sm">Category</label>
					<input name="category" id="city" type="text" placeholder="" className="w-full rounded-md focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-violet-400 border-gray-700" />
				</div>
				<div className="col-span-full sm:col-span-2">
					<label htmlFor="state" className="text-sm">Details</label>
					<input name="details" id="state" type="text" placeholder="" className="w-full rounded-md focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-violet-400 border-gray-700" />
				</div>
				<div className="col-span-full sm:col-span-2">
					<label htmlFor="zip" className="text-sm">Photo</label>
					<input name="photo" id="zip" type="text" placeholder="" className="w-full rounded-md focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-violet-400 border-gray-700" />
				</div>
			</div>
		</fieldset>  
        <input type="submit"  value="Add Coffee" className="btn btn-secondary" />
	</form>
</section>
       </div>
    );
};

export default AddCoffee;