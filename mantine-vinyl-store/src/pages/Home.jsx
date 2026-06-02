import { useState } from 'react';
import {
  Grid,
  Title,
  Group,
  Button,
  Drawer,
  Stack,
  Select,
  RangeSlider,
  SegmentedControl,
  Modal,
  Image,
  Text,
  Divider,
  Pagination,
  rem,
} from '@mantine/core';
import { IconAdjustments } from '@tabler/icons-react';
import ProductCard from '../components/ProductCard';
import { products as allProducts } from '../data/products';

export default function Home({ addToCart }) {
  const [opened, setOpened] = useState(false);
  const [genre, setGenre] = useState(null);
  const [sort, setSort] = useState('popular');
  const [priceRange, setPriceRange] = useState([10, 60]);
  const [view, setView] = useState('grid');
  const [page, setPage] = useState(1);
  const [quickItem, setQuickItem] = useState(null);

  let filtered = allProducts.filter(
    (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
  );
  if (genre) {
    filtered = filtered.filter((p) => p.genre === genre);
  }

  switch (sort) {
    case 'price-asc':
      filtered = [...filtered].sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      filtered = [...filtered].sort((a, b) => b.price - a.price);
      break;
    case 'newest':
      filtered = [...filtered].sort((a, b) => b.year - a.year);
      break;
    default:
      filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  }

  const totalPages = Math.max(1, Math.ceil(filtered.length / 8));
  const pageItems = filtered.slice((page - 1) * 8, page * 8);

  const genres = Array.from(new Set(allProducts.map((p) => p.genre))).sort();

  return (
    <>
      <Group justify='space-between' mb='md'>
        <Title order={2}>Featured Vinyl</Title>
        <Group gap='xs'>
          <SegmentedControl
            value={view}
            onChange={setView}
            data={[
              { label: 'Grid', value: 'grid' },
              { label: 'Compact', value: 'compact' },
            ]}
          />
          <Button
            leftSection={<IconAdjustments size={16} />}
            variant='default'
            onClick={() => setOpened(true)}
          >
            Filters
          </Button>
        </Group>
      </Group>

      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title='Filters'
        position='right'
        overlayProps={{ opacity: 0.4 }}
      >
        <Stack>
          <Select
            label='Genre'
            placeholder='All'
            clearable
            data={genres}
            value={genre}
            onChange={setGenre}
          />
          <Select
            label='Sort by'
            value={sort}
            onChange={setSort}
            data={[
              { label: 'Most popular', value: 'popular' },
              { label: 'Newest', value: 'newest' },
              { label: 'Price: low to high', value: 'price-asc' },
              { label: 'Price: high to low', value: 'price-desc' },
            ]}
          />
          <div>
            <Text fw={600} mb={4}>
              Price range (€)
            </Text>
            <RangeSlider
              min={5}
              max={100}
              step={1}
              value={priceRange}
              onChange={setPriceRange}
              label={(v) => `€${v}`}
            />
          </div>
        </Stack>
      </Drawer>

      {view === 'grid' ? (
        <Grid gutter='md'>
          {pageItems.map((p) => (
            <Grid.Col key={p.id} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
              <ProductCard
                product={p}
                onAdd={addToCart}
                onQuickView={setQuickItem}
              />
            </Grid.Col>
          ))}
        </Grid>
      ) : (
        <Stack>
          {pageItems.map((p) => (
            <Group key={p.id} wrap='nowrap' gap='md'>
              <Image
                src={p.cover}
                alt={p.title}
                w={rem(80)}
                h={rem(80)}
                fit='cover'
                radius='md'
              />
              <div style={{ flex: 1 }}>
                <Group justify='space-between' align='flex-start'>
                  <div>
                    <Text fw={600}>{p.title}</Text>
                    <Text size='sm' c='dimmed'>
                      {p.artist} · {p.genre} · {p.year}
                    </Text>
                  </div>
                  <Text fw={700}>€ {p.price.toFixed(2)}</Text>
                </Group>
                <Group mt='xs' gap='xs'>
                  <Button
                    size='xs'
                    variant='default'
                    onClick={() => setQuickItem(p)}
                  >
                    Quick view
                  </Button>
                  <Button size='xs' onClick={() => addToCart(p)}>
                    Add to cart
                  </Button>
                </Group>
              </div>
            </Group>
          ))}
        </Stack>
      )}

      <Group justify='center' mt='lg'>
        <Pagination value={page} onChange={setPage} total={totalPages} />
      </Group>

      <Modal
        opened={!!quickItem}
        onClose={() => setQuickItem(null)}
        title={quickItem?.title}
        size='lg'
      >
        {quickItem && (
          <>
            <Group align='start' wrap='nowrap'>
              <Image
                src={quickItem.cover}
                alt={quickItem.title}
                w={220}
                radius='md'
              />
              <Stack gap={6} style={{ flex: 1 }}>
                <Text c='dimmed'>{quickItem.artist}</Text>
                <Text size='sm' c='dimmed'>
                  {quickItem.genre} · {quickItem.year}
                </Text>
                <Divider my='xs' />
                <Text size='sm'>{quickItem.description}</Text>
                <Group justify='space-between' mt='sm'>
                  <Text fw={700}>€ {quickItem.price.toFixed(2)}</Text>
                  <Button onClick={() => addToCart(quickItem)}>
                    Add to cart
                  </Button>
                </Group>
              </Stack>
            </Group>
          </>
        )}
      </Modal>
    </>
  );
}
