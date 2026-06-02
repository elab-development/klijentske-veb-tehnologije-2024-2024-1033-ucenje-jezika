import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  Button,
  Rating,
  Stack,
} from '@mantine/core';

export default function ProductCard({ product, onAdd, onQuickView }) {
  return (
    <Card withBorder radius='md' padding='md'>
      <Card.Section>
        <Image src={product.cover} alt={product.title} h={250} fit='cover' />
      </Card.Section>

      <Stack gap='xs' mt='sm'>
        <Group justify='space-between'>
          <Text fw={600}>{product.title}</Text>
          <Badge>{product.genre}</Badge>
        </Group>
        <Text size='sm' c='dimmed' lineClamp={2}>
          {product.artist} · {product.year}
        </Text>

        <Group gap='xs'>
          <Rating fractions={2} readOnly value={product.rating} />
          <Text size='sm' c='dimmed'>
            ({product.reviews})
          </Text>
        </Group>

        <Group justify='space-between' mt='xs'>
          <Text fw={700}>€ {product.price.toFixed(2)}</Text>
          <Group gap='xs'>
            <Button
              size='xs'
              variant='default'
              onClick={() => onQuickView(product)}
            >
              Quick view
            </Button>
            <Button size='xs' onClick={() => onAdd(product)}>
              Add to cart
            </Button>
          </Group>
        </Group>
      </Stack>
    </Card>
  );
}
