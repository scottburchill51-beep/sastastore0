                      key={feature}
                      className="flex items-start gap-3 text-sm text-muted-foreground"
                    >
                      <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/10 text-xs font-bold text-brand">
                        ✓
                      </span>

                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <LinkButton
                  href="/products"
                  variant="secondary"
                >
                  ← Back to Products
                </LinkButton>
              </div>
            </div>

            {/* Plans */}
            <div>
              <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
                <p className="text-sm font-medium text-muted-foreground">
                  Choose your plan
                </p>

                <div className="mt-5 space-y-4">
                  {product.plans.map((plan) => {
                    const whatsappMessage =
                      createProductOrderMessage({
                        productName: product.name,
                        planName: plan.name,
                        price: plan.price,
                      });

                    const whatsappUrl =
                      createWhatsAppUrl(whatsappMessage);

                    // Remember the selected product and plan for the login flow.
                    const returnTo = `/products/${encodeURIComponent(product.slug)}?plan=${encodeURIComponent(String(plan.id))}`;
                    const orderUrl = user
                      ? whatsappUrl
                      : `/login?next=${encodeURIComponent(returnTo)}`;

                    return (
                      <div
                        key={plan.id}
                        className="rounded-xl border border-border bg-surface-elevated p-5"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h2 className="font-semibold text-foreground">
                              {plan.name}
                            </h2>

                            {plan.duration ? (
                              <p className="mt-1 text-sm text-muted-foreground">
                                {plan.duration}
                              </p>
                            ) : null}
                          </div>

                          <p className="text-xl font-bold text-foreground">
                            Rs. {formatPrice(plan.price)}
                          </p>
                        </div>

                        <a
                          href={orderUrl}
                          target={user ? "_blank" : undefined}
                          rel={user ? "noopener noreferrer" : undefined}
                          className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-hover"
                        >
                          {user ? "Order on WhatsApp" : "Login to Order"}
                        </a>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 border-t border-border pt-6">
                  <p className="text-sm font-medium text-foreground">
                    Delivery information
                  </p>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {product.deliveryInfo}
                  </p>
                </div>

                <div className="mt-6 rounded-xl border border-brand/20 bg-brand/5 p-4">
                  <p className="text-sm leading-6 text-muted-foreground">
                    Need help choosing a plan? Message SastaStore on
                    WhatsApp before ordering.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Related Products */}
      {relatedProducts.length > 0 ? (
        <Section className="border-t border-border">
          <Container>
            <Reveal>
              <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <SectionHeading
                  eyebrow="You May Also Like"
                  title="Related products"
                  description={`Explore more digital tools and subscriptions similar to ${product.name}.`}
                />

                <LinkButton
                  href="/products"
                  variant="secondary"
                >
                  View All Products →
                </LinkButton>
              </div>
            </Reveal>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((relatedProduct, index) => (
                <Reveal
                  key={relatedProduct.slug}
                  delay={index * 80}
                  className="h-full"
                >
                  <ProductCard product={relatedProduct} />
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}
    </main>
  );
}
