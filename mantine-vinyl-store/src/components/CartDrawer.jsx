import {
  Drawer,
  Table,
  Group,
  Text,
  Image,
  NumberInput,
  ActionIcon,
  Button,
  Stack,
  Divider,
} from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';

export default function CartDrawer({
  opened,
  onClose,
  cart,
  updateQty,
  removeItem,
  clearCart,
}) {
  const total = cart.reduce(
    (sum, { product, qty }) => sum + product.price * qty,
    0
  );

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      position='right'
      title='Your cart'
      size='lg'
    >
      {cart.length === 0 ? (
        <Text c='dimmed'>Your cart is empty.</Text>
      ) : (
        <Stack gap='sm'>
          <Table highlightOnHover withRowBorders={false}>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Item</Table.Th>
                <Table.Th>Qty</Table.Th>
                <Table.Th>Price</Table.Th>
                <Table.Th>Total</Table.Th>
                <Table.Th style={{ width: 40 }} />
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {cart.map(({ id, product, qty }) => (
                <Table.Tr key={id}>
                  <Table.Td>
                    <Group gap='sm'>
                      <Image
                        src={product.cover}
                        w={48}
                        h={48}
                        radius='sm'
                        fit='cover'
                        alt={product.title}
                      />
                      <div>
                        <Text fw={600} size='sm'>
                          {product.title}
                        </Text>
                        <Text size='xs' c='dimmed'>
                          {product.artist} · {product.genre} · {product.year}
                        </Text>
                      </div>
                    </Group>
                  </Table.Td>

                  <Table.Td>
                    <NumberInput
                      min={0}
                      value={qty}
                      onChange={(v) => updateQty(id, Number(v) || 0)}
                      size='xs'
                      w={80}
                    />
                  </Table.Td>

                  <Table.Td>€ {product.price.toFixed(2)}</Table.Td>
                  <Table.Td>€ {(product.price * qty).toFixed(2)}</Table.Td>
                  <Table.Td>
                    <ActionIcon
                      color='red'
                      variant='subtle'
                      onClick={() => removeItem(id)}
                      aria-label='Remove'
                    >
                      <IconTrash size={16} />
                    </ActionIcon>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>

          <Divider />

          <Group justify='space-between' align='center'>
            <Button variant='subtle' color='red' onClick={clearCart}>
              Clear cart
            </Button>
            <Group>
              <Text fw={700} size='lg'>
                Total: € {total.toFixed(2)}
              </Text>
              <Button onClick={clearCart}>Checkout</Button>
            </Group>
          </Group>
        </Stack>
      )}
    </Drawer>
  );
}
