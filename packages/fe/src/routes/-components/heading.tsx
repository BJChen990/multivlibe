import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from '@radix-ui/react-navigation-menu'
import { Link } from '@tanstack/react-router'

export const Heading = () => {
  return (
    <NavigationMenu className='p-4 border-b-1'>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link to="/repositories" className="[&.active]:font-bold">
              Repositories
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
