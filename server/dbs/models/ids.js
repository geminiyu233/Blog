import mongoose from 'mongoose'

const idsSchema = new mongoose.Schema({
	admin_id: Number,
	tag_id: Number,
	article_id: Number,
	permission_id: Number,
	draft_id: Number,
	article_statu_id: Number
});

const Ids = mongoose.model('Ids', idsSchema);

Ids.findOne((err, data) => {
	if (!data) {
		const newIds = new Ids({
			admin_id: 0,
			tag_id: 0,
			article_id: 0,
			permission_id: 0,
			draft_id: 0,
			article_statu_id: 0
		});
		newIds.save();
	}
})
export default Ids