/*eslint-disable*/
import React,{useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './_salesProduct.scss';
import Azza from '../../../Filters/Azza';
import SearchBar from '../../../SearchBar/SearchBar';
import { removeProductForAdmin, deletAllProductsSales, getBackup } from '../../../../redux/actions/actionFront';
// import { sendDiscountToBack } from '../../../../redux/actions/actionBack';


const SalesProduct = () =>{
	const dispatch = useDispatch()
	const allProducts = useSelector((store) => store.reducerProduct.adminProducts);
	
	const [input, setInput] = useState({
		productId: [],
		discount: 0,
	});
		

	

function onClose(g) {
	dispatch(removeProductForAdmin(g));
	}
	const Delete = () =>{
		dispatch(deletAllProductsSales())
	}
	const Send = async () => {
		input.productId = await allProducts.map(x =>{return x.id})
		alert(input.productId)
		dispatch(sendDiscountToBack(input))
	};
	const getAll = () =>{
		dispatch(getBackup());
	}
	const handleValue= (e) =>{
		setInput({
			...input,
			discount: e.target.value
		})
	}
	let num = 1;
   return (
		<>
			<tbody>
				<th>
					<h1 className="title">List de productos para aplicar descuento</h1>
				</th>
			</tbody>

			<table id="products">
				<td>
					<SearchBar />
					<Azza />
				</td>
				<td></td>
				<td onClick={() => Delete()} className="delete-td">
					Delete <br />
					All
				</td>
				<td onClick={() => getAll()} className="getall-td">
					Select <br />
					All
				</td>
			</table>
			<br />

			<table id="products">
				<tr id="trHeader">
					<td>Delete</td>
					<td></td>
					<td>Product Name</td>
					<td>Author Name</td>
					<td>Categorie</td>
					<td>Regular Price</td>
					<td>Precio con descuento</td>
					<td>
						Descuento %
						<select onChange={handleValue}>
							<option default value="0">
								%
							</option>
							<option name={input.discount} value="5">
								5
							</option>
							<option name={input.discount} value="10">
								10
							</option>
							<option name={input.discount} value="15">
								15
							</option>
							<option name={input.discount} value="20">
								20
							</option>
							<option name={input.discount} value="25">
								25
							</option>
							<option name={input.discount} value="30">
								30
							</option>
							<option name={input.discount} value="35">
								35
							</option>
							<option name={input.discount} value="40">
								40
							</option>
							<option name={input.discount} value="45">
								45
							</option>
							<option name={input.discount} value="50">
								50
							</option>
						</select>
					</td>
				</tr>

				{[...allProducts].map((g) => {
					return (
						<>
							<tr key={g.id}>
								<td>
									<button onClick={() => onClose(g.id)}>
										<i className="fas fa-trash"></i>
									</button>
								</td>
								<td>{num++}</td>
								<td>{g.name}</td>
								<td>{g.author.name}</td>
								<td>
									{g.categories.map((x) => {
										return x.name;
									})}
								</td>
								<td>{g.price}</td>
								<td>$83</td>
								<td>% {input.discount}</td>
							</tr>
						</>
					);
				})}
			</table>
			<button onClick={() => Send()}>OK</button>
		</>
   );
}

export default SalesProduct;
