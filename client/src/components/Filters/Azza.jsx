/*eslint-disable*/
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './_filter.scss';
import { orderAsc, orderByCategories, orderByAuthor, orderStar, getBackup } from '../../redux/actions/actionFront';
import Score from './Score';

function Filter() {
	const [toggle, setToggle] = useState(false);
	const dispatch = useDispatch();
	const allCategories = useSelector((state) => state.reducerCategories.allCategoriesCache);
	const allArtist = useSelector((state) => state.reducerArtist.allArtistCache);
	const selectAuthor = useSelector((state) => state.reducerProduct.author);
	const selectCategorie = useSelector((state) => state.reducerProduct.categorie);
	const disponibleAuthor = useSelector((state) => state.reducerProduct.authorDisponible);
	const disponibleCategories = useSelector((state) => state.reducerProduct.contegorieDisponible);

	const handleFilter = (e) => {
		e.target.value === 'All' ? dispatch(getBackup()) : dispatch(orderByCategories(e.target.value));
	};

	const handleOrder = (e) => {
		dispatch(orderAsc(e.target.value));
		toggle ? setToggle(false) : setToggle(true);
	};

	const handleAuthor = (e) => {
		e.target.value === 'All' ? dispatch(getBackup()) : dispatch(orderByAuthor(e.target.value));
	};
	const handleBackUp = (e) => {
		e.preventDefault();
		dispatch(getBackup());
	};

	return (
		<>
			<div className="Container-Filter">
				<button className="Boton-Reset" onClick={(e) => handleBackUp(e)}>
					{`Reset`}
				</button>
				<div className="filter">
					{
						<>
							<select onChange={(e) => handleFilter(e)}>
								<option default value="All">
									Filter By Category
								</option>
								{selectAuthor
									? disponibleCategories &&
									  disponibleCategories.map((C) => {
											return <option value={C}>{C}</option>;
									  })
									: allCategories &&
									  allCategories.map((C) => {
											return <option value={C.name}>{C.name}</option>;
									  })}
							</select>

							<select onChange={(e) => handleAuthor(e)}>
								<option default value="All">
									Filter By Author
								</option>
								{!selectCategorie
									? allArtist &&
									  allArtist.map((a) => {
											return <option value={a.name}>{a.name}</option>;
									  })
									: disponibleAuthor &&
									  disponibleAuthor.map((a) => {
											return <option value={a}>{a}</option>;
									  })}
							</select>
							<Score />
						</>
					}

					{!toggle ? (
						<button className="fas fa-sort-alpha-down" value="asc_name" onClick={(e) => handleOrder(e)} />
					) : (
						<button className="fas fa-sort-alpha-up" value="desc_name" onClick={(e) => handleOrder(e)} />
					)}
				</div>
			</div>
		</>
	);
}
export default Filter;
