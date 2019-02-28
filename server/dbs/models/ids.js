import mongoose from 'mongoose'

const idsSchema = new mongoose.Schema({
	admin_id: Number,
	tag_id: Number
});

const Ids = mongoose.model('Ids', idsSchema);

Ids.findOne((err, data) => {
	console.log('IdsData', data)
	if (!data) {
		const newIds = new Ids({
			admin_id: 0,
			tag_id: 0
		});
		newIds.save();
	}
})
export default Ids