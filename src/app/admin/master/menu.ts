export const Menu: any = [
  {
    title: 'MANAGE BANNER',
    icon: 'star-outline',
    link:'/admin/banner/list'
  },
  {
    title: 'MANAGE HOME BANNER',
    icon: 'star-outline',
    link:'/admin/home-banner'
  },
  {
    title: 'MANAGE PRODUCT',
    icon: 'star-outline',
    children: [
      {
        title:'Create product',
        link:'/admin/product/create'
      },
      {
        title:'Product List',
        link:'/admin/product/list'
      },
    ]
  },
  {
    title:'MANAGE ORDER',
    icon: 'star-outline',
    link: '/admin/order'
  },
  {
    title:'MANAGE MAIL',
    icon: 'star-outline',
    link: '/admin/mail'
  },
  {
    title: 'MANAGE ABOUTUS PAGE',
    icon: 'star-outline',
    children: [
      {
        title:'Aboutus sppeh',
        link:'/admin/aboutus/info/list'
      },
      {
        title:'Aboutus banner',
        link:'/admin/aboutus/banner/list'
      },
    ]
  },
  {
    title: 'MANAGE CONTACT',
    icon: 'star-outline',
    link:'/admin/contact/list'
  },
  {
    title: 'MANAGE NEWS LETTER',
    icon: 'star-outline',
    link:'/admin/news-letter'
  },
  {
    title: 'MANAGE OTHERS',
    icon: 'star-outline',
    link:'/admin/others/list'
  },
  {
    title: 'MANAGE SOCIAL LINK',
    icon: 'star-outline',
    link:'/admin/social/list'
  },
  {
    title: 'MANAGE FOOTER CARD',
    icon: 'star-outline',
    link: '/admin/footer-card'
  },
  {
    title: 'MANAGE ADMIN',
    icon: 'star-outline',
    children: [
      {
        title: 'Change password',
        link: '/admin/change-password'
      },
      {
        title: 'Manage Admin',
        link: '/admin/admins/list'
      },
      {
        title: 'Manage User',
        link: '/admin/users/list'
      },
    ]
  },
];
