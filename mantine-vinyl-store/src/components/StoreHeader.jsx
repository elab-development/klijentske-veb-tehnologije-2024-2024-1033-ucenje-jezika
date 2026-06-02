import {
  Group,
  Anchor,
  ActionIcon,
  Indicator,
  useMantineColorScheme,
} from '@mantine/core';
import { IconShoppingCart, IconSun, IconMoon } from '@tabler/icons-react';

export default function StoreHeader({ cartCount = 0, onCartClick }) {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Group justify='space-between' px='md' h='100%'>
      <Anchor href='#' underline='never' fw={700} fz='lg'>
        Vinyl Vibes
      </Anchor>

      <Group>
        <ActionIcon
          variant='default'
          radius='md'
          onClick={() => setColorScheme(isDark ? 'light' : 'dark')}
          aria-label='Toggle color scheme'
        >
          {isDark ? <IconSun size={18} /> : <IconMoon size={18} />}
        </ActionIcon>

        <Indicator label={cartCount} size={18} disabled={cartCount === 0}>
          <ActionIcon
            variant='light'
            radius='md'
            onClick={onCartClick}
            aria-label='Open cart'
          >
            <IconShoppingCart size={18} />
          </ActionIcon>
        </Indicator>
      </Group>
    </Group>
  );
}
