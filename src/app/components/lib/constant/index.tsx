import React, { SVGProps } from 'react'

import {
  HomeIconDark,
  HomeIconLight,
  ProductsIconDark,
  ProductsIconLight,
  CollectionsIconDark,
  CollectionsIconLight,
  OrderIconDark,
  OrderIconLight,
  CustomersIconDark,
  CustomersIconLight,
  WalletIconDark,
  WalletIconLight,
  SettingIconDark,
  SettingIconLight,
} from '@/app/components/svgs/NavbarSvgs'
import DollarIcon from '../../svgs/DollarIcon'
import CustomersIcon from '../../svgs/CustomersIcon'
import WalletIcon from '../../svgs/WalletIcon'
import OrdersIcon from '../../svgs/OrdersIcon'

export type SidebarLinksProps = {
  path: string
  label: string
  iconDark: SVGProps<SVGSVGElement> | React.ReactNode
  iconLight: SVGProps<SVGSVGElement> | React.ReactNode
  id: number
}

export const sidebarLinks: SidebarLinksProps[] = [
  {
    id: 1,
    path: '/dashboard',
    label: 'Home',
    iconDark: HomeIconDark,
    iconLight: HomeIconLight,
  },
  {
    id: 2,
    path: '/products',
    label: 'Products',
    iconDark: ProductsIconDark,
    iconLight: ProductsIconLight,
  },
  {
    id: 3,
    path: '/collection',
    label: 'Collection',
    iconDark: CollectionsIconDark,
    iconLight: CollectionsIconLight,
  },
  {
    id: 4,
    path: '/order',
    label: 'Order',
    iconDark: OrderIconDark,
    iconLight: OrderIconLight,
  },
  {
    id: 5,
    path: '/customers',
    label: 'Customers',
    iconDark: CustomersIconDark,
    iconLight: CustomersIconLight,
  },
  {
    id: 6,
    path: '/wallet',
    label: 'Wallet',
    iconDark: WalletIconDark,
    iconLight: WalletIconLight,
  },
  {
    id: 7,
    path: '/setting',
    label: 'Setting',
    iconDark: SettingIconDark,
    iconLight: SettingIconLight,
  },
]

// cardData.ts

export type CardDataType = {
  id: number
  percentage: number
  text: string
  digits: string
  icon: React.FC
}

export const cardData: CardDataType[] = [
  {
    id: 1,
    percentage: 24,
    text: 'Income',
    digits: 'N 123,000,567.00',
    icon: DollarIcon,
  },
  {
    id: 2,
    percentage: 25,
    text: 'Customers',
    digits: '29,289',
    icon: CustomersIcon,
  },
  {
    id: 3,
    percentage: 18,
    text: 'Transactions',
    digits: '24,683',
    icon: WalletIcon,
  },
  { id: 4, percentage: 12, text: 'Orders', digits: '18,289', icon: OrdersIcon },
]

export const Cities = [
  'New York',
  'Los Angeles',
  'Chicago',
  'Houston',
  'Phoenix', // United States
  'London',
  'Manchester',
  'Birmingham',
  'Liverpool',
  'Glasgow', // United Kingdom
  'Paris',
  'Marseille',
  'Lyon',
  'Toulouse',
  'Nice', // France
  'Tokyo',
  'Osaka',
  'Nagoya',
  'Sapporo',
  'Fukuoka', // Japan
  'Sydney',
  'Melbourne',
  'Brisbane',
  'Perth',
  'Adelaide', // Australia
  'Toronto',
  'Montreal',
  'Vancouver',
  'Calgary',
  'Edmonton', // Canada
  'Berlin',
  'Hamburg',
  'Munich',
  'Cologne',
  'Frankfurt', // Germany
  'Rome',
  'Milan',
  'Naples',
  'Turin',
  'Palermo', // Italy
  'Madrid',
  'Barcelona',
  'Valencia',
  'Seville',
  'Zaragoza', // Spain
  'Beijing',
  'Shanghai',
  'Guangzhou',
  'Shenzhen',
  'Chengdu', // China
  'Moscow',
  'Saint Petersburg',
  'Novosibirsk',
  'Yekaterinburg',
  'Nizhny Novgorod', // Russia
  'Mexico City',
  'Guadalajara',
  'Monterrey',
  'Puebla',
  'Tijuana', // Mexico
  'São Paulo',
  'Rio de Janeiro',
  'Salvador',
  'Brasília',
  'Fortaleza', // Brazil
  'Mumbai',
  'Delhi',
  'Bangalore',
  'Hyderabad',
  'Ahmedabad', // India
]
