'use strict';
//获取数据库的引用
const db = uniCloud.database()

//获取集合的引用

const articleCollection = db.collection('article')

const contentCollection = db.collection('content')
exports.main = async (event, context) => {
	//增
	// let { title,cover,category } = event
	// let res = await articleCollection.add({
	// 	title,cover,category
	// })
	//删
	// let _id = event.id
	//  let res =	await articleCollection.doc(_id).remove()
	// let res = await articleCollection.where({
	//  _id
	// }).remove()
	//改
	// let _id = event.id
	// let res = await articleCollection.doc(_id).update({
	//  title:event.title,
	//  ceshi:event.ceshi
	// })
	//查
	//查询所有
	// let res = await articleCollection.get()
	//查询部分
	// let res = await articleCollection.skip(0).limit(3).get()
	// let { activeIndex,limit} = event
	// let skip = (activeIndex - 1 ) * limit
	// let res = await articleCollection.skip(skip).limit(limit).get()
	// return res
	switch (event.type) {
		case 'list':
			let {
				activeIndex, limit
			} = event
			let skip = (activeIndex - 1) * limit
			return await articleCollection.skip(skip).limit(limit).get()
			break;
		case 'content':
			let article_id = event.id
			let res = await contentCollection.where({
				article_id
			}).get()
			return res
			break;
	}
};
