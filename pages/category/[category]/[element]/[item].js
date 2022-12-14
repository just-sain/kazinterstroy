const Item = () => {
	return <div></div>;
};

export default Item;

export const getServerSideProps = async ctx => {
	if (!ctx?.query || !ctx.query.category || isNaN(ctx.query.category) || !ctx.query.item || isNaN(ctx.query.item)) {
		return { notFound: true };
	}

	// menu
	const { data: menu } = await axios.get(
		`${process.env.NEXT_PUBLIC_API}/categories?access-token=${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`
	);

	// items
	// const { data: items } = await axios.get(
	// 	`${process.env.NEXT_PUBLIC_API}/items?access-token=${process.env.NEXT_PUBLIC_ACCESS_TOKEN}&limit=250&category=${ctx.query.item}&additional_fields=url,brand,images`
	// );

	// return {
	// 	props: {
	// 		menu,
	// 		items,
	// 		categoryId: ctx.query.category,
	// 		itemId: ctx.query.item
	// 	}
	// };
};
