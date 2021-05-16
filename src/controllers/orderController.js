const Order = require("../models/orderModel");
const OrderItem = require("../models/orderItemsModel");

exports.createOrder = async (req, res) => {
  const { orderItems, shippingAddress, city, country, zip, phoneNumber, user } =
    req.body;

  let orderItemIds = Promise.all(
    orderItems.map(async (value) => {
      newOrderItems = new OrderItem({
        quantity: value.quantity,
        product: value.product,
      });

      newOrderItems = await newOrderItems.save();

      return newOrderItems._id;
    })
  );

  const orderItemsResolved = await orderItemIds;
  
  const totalPrices = await Promise.all(orderItemsResolved.map(async(orderItemId)=>{
    const orderItem = await OrderItem.findById( orderItemId )
    .populate(
      "product",
      "price"
    );
    const totalPrice = orderItem.product.price * orderItem.quantity;
    return totalPrice
  }))

  const totalPrice = totalPrices.reduce((a,b)=>a+b,0)

  
  const order = new Order({
    orderItems: orderItemsResolved,
    shippingAddress,
    city,
    country,
    zip,
    phoneNumber,
    totalPrice,
    user,
  });

  const saveOrder = await order.save();

  if (!saveOrder) {
    res.status(400).send("Error");
  }
  res.status(200).json({
    message: "success order product",
    data:order
  });
};

exports.getAllOrder = async (req, res) => {
  // const order = await Order.find().populate('user')

  try {
    const order = await Order.find()
      .populate("user", "name email phone address")
      .populate({ path: "orderItems", populate: { path: "product",select:"-createdAt -updatedAt",populate:{path:"category",select:"name" }} })
      .sort({ dateOrdered: -1 });

    const orderList = order;
    if (orderList.length < 1) {
      return res
        .status(400)
        .json({ message: "Order Not Found", status: false });
    }
    res.send({ order });
  } catch (error) {
    console.log(error);
  }
};

exports.getOrderById = async (req, res) => {
  const orderId = req.params.id;
  try {
    const order = await Order.findById(orderId)
      .populate("user", "name email phone address")
      .populate({ path: "orderItems", populate: { path: "product",select:"-createdAt -updatedAt",populate:{path:"category",select:"name" }} });

    if (!order) {
      res.status(400).send("order Not Found");
    }
    res.status(200).json(order);
  } catch (error) {
    console.log(error);
  }
};

exports.getTotalSales = async (req, res) => {
  const totalSales = await Order.aggregate([
    {$group: {
      _id: null,
      totalSales: {$sum: "$totalPrice"}}
    },
  ]);
  if(!totalSales){
    return res.status(400).send("can't Genereted totalSales")
  }
  res.status(200).send({ totalsales: totalSales.pop().totalSales });
};

exports.updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id
    const {statusOrder} = req.body

    const order = await Order.findByIdAndUpdate(orderId, { statusOrder: statusOrder });

    if(!order){
      return res.status(400).send("no Order")
    }
    res.status(200).send({order})
  } catch (error) {
    console.log(error)
  }
}

exports.deleteOrder = async (req, res) => {
  const orderId = req.params.id

   await Order.findByIdAndRemove(orderId).then(async(result) => {
     if(result){
      await result.orderItems.map(async orderItemId =>{
         console.log(orderItemId);
         await OrderItem.findByIdAndRemove(orderItemId);
       })

       res.status(200).json({status: true,message:"Order has been Removed"});
     }else{
       return res.status(200).json({status: false,message:"Order not found"});
     }
     
   
  }).catch(err =>{
   res.status(500).json({ status: false, message: err });
  })

}

exports.getUserOrder = async (req, res) => {
  const userId = req.params.userId

    const userOrderList = await Order.find({ user: userId })
      .populate("user", "name email phone address")
      .populate({
        path: "orderItems",
        populate: {
          path: "product",
          select: "-createdAt -updatedAt",
          populate: { path: "category", select: "name" },
        },
      })
      .sort({ dateOrdered: -1 });

      if(!userOrderList){
        return res.status(400).send("No Order Found")
      }
      res.status(200).json({ message: "get success", data: userOrderList });

}