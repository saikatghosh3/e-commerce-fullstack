import connectDB from '@/lib/db';
import Order from '@/models/Order';
import Product from '@/models/Product';
import User from '@/models/User';
import Category from '@/models/Category';

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || 'all';
    const ordersPage = parseInt(searchParams.get('ordersPage')) || 1;
    const ordersLimit = parseInt(searchParams.get('ordersLimit')) || 5;

    const now = new Date();
    let dateFilter = {};
    if (period === '7d') {
      const d = new Date(now);
      d.setDate(d.getDate() - 7);
      dateFilter = { createdAt: { $gte: d } };
    } else if (period === '30d') {
      const d = new Date(now);
      d.setDate(d.getDate() - 30);
      dateFilter = { createdAt: { $gte: d } };
    }

    const revenueMatch = {
      $match: {
        ...dateFilter,
        $or: [
          { paymentStatus: 'completed' },
          { orderStatus: 'delivered' },
        ],
      },
    };

    const [
      totalProducts,
      totalOrders,
      totalUsers,
      totalCategories,
      revenueResult,
      orderStatusData,
      categoryData,
      monthlyRevenueData,
      recentOrdersResult,
      totalOrdersCount,
    ] = await Promise.all([
      Product.countDocuments(),
      Order.countDocuments(dateFilter),
      User.countDocuments(),
      Category.countDocuments(),
      Order.aggregate([
        revenueMatch,
        { $group: { _id: null, total: { $sum: '$totalAmount' } } },
      ]),
      Order.aggregate([
        { $match: dateFilter },
        { $group: { _id: '$orderStatus', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
      Product.aggregate([
        { $group: { _id: '$category', count: { $sum: 1 }, totalStock: { $sum: '$stock' } } },
        { $sort: { count: -1 } },
      ]),
      Order.aggregate([
        revenueMatch,
        {
          $group: {
            _id: {
              year: { $year: '$createdAt' },
              month: { $month: '$createdAt' },
            },
            revenue: { $sum: '$totalAmount' },
            count: { $sum: 1 },
          },
        },
        { $sort: { '_id.year': 1, '_id.month': 1 } },
      ]),
      Order.find(dateFilter)
        .sort({ createdAt: -1 })
        .skip((ordersPage - 1) * ordersLimit)
        .limit(ordersLimit)
        .select('orderNumber totalAmount orderStatus paymentStatus createdAt shippingAddress.name'),
      Order.countDocuments(dateFilter),
    ]);

    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;
    const pendingOrders = await Order.countDocuments({ ...dateFilter, orderStatus: 'pending' });

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const monthlyRevenue = monthlyRevenueData.map((item) => ({
      month: `${monthNames[item._id.month - 1]} ${item._id.year}`,
      revenue: item.revenue,
      orders: item.count,
    }));

    const orderStatusColors = {
      pending: '#F59E0B',
      processing: '#3B82F6',
      shipped: '#8B5CF6',
      delivered: '#10B981',
      cancelled: '#EF4444',
    };

    const orderDistribution = orderStatusData.map((item) => ({
      name: item._id.charAt(0).toUpperCase() + item._id.slice(1),
      value: item.count,
      color: orderStatusColors[item._id] || '#6B7280',
    }));

    const categoryColors = [
      '#8B5CF6', '#3B82F6', '#10B981', '#F59E0B', '#EF4444',
      '#EC4899', '#14B8A6', '#F97316', '#6366F1', '#84CC16',
    ];

    const categoryDistribution = categoryData.map((item, index) => ({
      name: item._id,
      products: item.count,
      stock: item.totalStock,
      fill: categoryColors[index % categoryColors.length],
    }));

    const pages = Math.ceil(totalOrdersCount / ordersLimit);

    return Response.json({
      success: true,
      data: {
        overview: {
          totalRevenue,
          totalOrders: totalOrdersCount,
          totalProducts,
          totalUsers,
          totalCategories,
          pendingOrders,
        },
        monthlyRevenue,
        orderDistribution,
        categoryDistribution,
        recentOrders: {
          orders: recentOrdersResult.map((o) => ({
            _id: o._id,
            orderNumber: o.orderNumber,
            totalAmount: o.totalAmount,
            orderStatus: o.orderStatus,
            paymentStatus: o.paymentStatus,
            customerName: o.shippingAddress?.name || 'N/A',
            createdAt: o.createdAt,
          })),
          pagination: {
            page: ordersPage,
            limit: ordersLimit,
            total: totalOrdersCount,
            pages,
          },
        },
      },
    });
  } catch (error) {
    console.error('Analytics error:', error);
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
